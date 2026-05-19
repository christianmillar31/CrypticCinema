from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import get_db_session
from app.db.models import Collection, CollectionTitle, Title
from app.schemas.collections import (
    CollectionCreate,
    CollectionDetail,
    CollectionSummary,
    CollectionTitleAdd,
)
from app.utils.slugs import slugify

router = APIRouter()


def build_unique_collection_slug(
    db: Session, candidate: str, collection_id: Optional[str] = None
) -> str:
    base = slugify(candidate)
    slug = base
    suffix = 2
    while True:
        existing = db.scalar(select(Collection).where(Collection.slug == slug))
        if not existing or existing.id == collection_id:
            return slug
        slug = f"{base}-{suffix}"
        suffix += 1


def get_collection_or_404(db: Session, collection_id: str) -> Collection:
    stmt = (
        select(Collection)
        .where(Collection.id == collection_id)
        .options(selectinload(Collection.items).selectinload(CollectionTitle.title))
        .execution_options(populate_existing=True)
    )
    collection = db.scalar(stmt)
    if not collection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")
    return collection


def get_collection_by_slug_or_404(db: Session, slug: str) -> Collection:
    stmt = (
        select(Collection)
        .where(Collection.slug == slug)
        .options(selectinload(Collection.items).selectinload(CollectionTitle.title))
        .execution_options(populate_existing=True)
    )
    collection = db.scalar(stmt)
    if not collection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")
    return collection


def get_title_or_404(db: Session, title_id: str) -> Title:
    title = db.scalar(select(Title).where(Title.id == title_id))
    if not title:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Title not found")
    return title


@router.post("", response_model=CollectionDetail, status_code=status.HTTP_201_CREATED)
def create_collection(payload: CollectionCreate, db: Session = Depends(get_db_session)) -> Collection:
    slug_candidate = payload.slug or payload.title
    slug = build_unique_collection_slug(db, slug_candidate)
    collection = Collection(title=payload.title, slug=slug, description=payload.description)
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return get_collection_or_404(db, collection.id)


@router.get("", response_model=list[CollectionSummary])
def list_collections(
    q: Optional[str] = Query(default=None, min_length=1, max_length=200),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db_session),
) -> list[Collection]:
    stmt = select(Collection).order_by(Collection.created_at.desc())
    if q:
        stmt = stmt.where(Collection.title.ilike(f"%{q}%"))
    stmt = stmt.offset(offset).limit(limit)
    return list(db.scalars(stmt).all())


@router.get("/{collection_id}", response_model=CollectionDetail)
def get_collection(collection_id: str, db: Session = Depends(get_db_session)) -> Collection:
    return get_collection_or_404(db, collection_id)


@router.get("/by-slug/{slug}", response_model=CollectionDetail)
def get_collection_by_slug(slug: str, db: Session = Depends(get_db_session)) -> Collection:
    return get_collection_by_slug_or_404(db, slug)


@router.post("/{collection_id}/titles", response_model=CollectionDetail)
def add_title_to_collection(
    collection_id: str,
    payload: CollectionTitleAdd,
    db: Session = Depends(get_db_session),
) -> Collection:
    collection = get_collection_or_404(db, collection_id)
    title = get_title_or_404(db, payload.title_id)

    existing = db.scalar(
        select(CollectionTitle).where(
            CollectionTitle.collection_id == collection.id,
            CollectionTitle.title_id == title.id,
        )
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Title already exists in collection",
        )

    desired_position = payload.position or len(collection.items) + 1
    desired_position = max(1, desired_position)
    for item in collection.items:
        if item.position >= desired_position:
            item.position += 1

    link = CollectionTitle(
        collection_id=collection.id,
        title_id=title.id,
        position=desired_position,
        note=payload.note,
    )
    db.add(link)
    db.commit()
    return get_collection_or_404(db, collection.id)


@router.delete("/{collection_id}/titles/{title_id}", response_model=CollectionDetail)
def remove_title_from_collection(
    collection_id: str,
    title_id: str,
    db: Session = Depends(get_db_session),
) -> Collection:
    collection = get_collection_or_404(db, collection_id)
    link = db.scalar(
        select(CollectionTitle).where(
            CollectionTitle.collection_id == collection.id,
            CollectionTitle.title_id == title_id,
        )
    )
    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Title is not linked to this collection",
        )

    removed_position = link.position
    db.delete(link)

    remaining_items = db.scalars(
        select(CollectionTitle).where(
            CollectionTitle.collection_id == collection.id,
            CollectionTitle.position > removed_position,
        )
    ).all()
    for item in remaining_items:
        item.position -= 1

    db.commit()
    return get_collection_or_404(db, collection.id)
