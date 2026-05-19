from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db_session
from app.db.models import Title, TitleType
from app.schemas.titles import TitleCreate, TitleRead, TitleUpdate
from app.utils.slugs import slugify

router = APIRouter()


def build_unique_title_slug(db: Session, candidate: str, title_id: Optional[str] = None) -> str:
    base = slugify(candidate)
    slug = base
    suffix = 2
    while True:
        existing = db.scalar(select(Title).where(Title.slug == slug))
        if not existing or existing.id == title_id:
            return slug
        slug = f"{base}-{suffix}"
        suffix += 1


def get_title_or_404(db: Session, title_id: str) -> Title:
    title = db.scalar(select(Title).where(Title.id == title_id))
    if not title:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Title not found")
    return title


def get_title_by_slug_or_404(db: Session, slug: str) -> Title:
    title = db.scalar(select(Title).where(Title.slug == slug))
    if not title:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Title not found")
    return title


@router.post("", response_model=TitleRead, status_code=status.HTTP_201_CREATED)
def create_title(payload: TitleCreate, db: Session = Depends(get_db_session)) -> Title:
    slug_candidate = payload.slug or payload.name
    slug = build_unique_title_slug(db, slug_candidate)
    title = Title(
        name=payload.name,
        slug=slug,
        content_type=payload.content_type,
        release_year=payload.release_year,
        runtime_minutes=payload.runtime_minutes,
        synopsis=payload.synopsis,
        poster_url=payload.poster_url,
    )
    db.add(title)
    db.commit()
    db.refresh(title)
    return title


@router.get("", response_model=list[TitleRead])
def list_titles(
    q: Optional[str] = Query(default=None, min_length=1, max_length=255),
    content_type: Optional[TitleType] = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db_session),
) -> list[Title]:
    stmt = select(Title).order_by(Title.created_at.desc())
    if q:
        stmt = stmt.where(Title.name.ilike(f"%{q}%"))
    if content_type:
        stmt = stmt.where(Title.content_type == content_type)
    stmt = stmt.offset(offset).limit(limit)
    return list(db.scalars(stmt).all())


@router.get("/{title_id}", response_model=TitleRead)
def get_title(title_id: str, db: Session = Depends(get_db_session)) -> Title:
    return get_title_or_404(db, title_id)


@router.get("/by-slug/{slug}", response_model=TitleRead)
def get_title_by_slug(slug: str, db: Session = Depends(get_db_session)) -> Title:
    return get_title_by_slug_or_404(db, slug)


@router.patch("/{title_id}", response_model=TitleRead)
def update_title(
    title_id: str,
    payload: TitleUpdate,
    db: Session = Depends(get_db_session),
) -> Title:
    title = get_title_or_404(db, title_id)
    updates = payload.model_dump(exclude_unset=True)

    if "slug" in updates and updates["slug"]:
        updates["slug"] = build_unique_title_slug(db, updates["slug"], title_id=title.id)
    elif "name" in updates and updates["name"] and title.slug == slugify(title.name):
        updates["slug"] = build_unique_title_slug(db, updates["name"], title_id=title.id)

    for field, value in updates.items():
        setattr(title, field, value)

    db.add(title)
    db.commit()
    db.refresh(title)
    return title


@router.delete("/{title_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_title(title_id: str, db: Session = Depends(get_db_session)) -> None:
    title = get_title_or_404(db, title_id)
    db.delete(title)
    db.commit()
