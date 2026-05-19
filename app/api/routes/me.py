from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import get_current_user, get_db_session
from app.db.models import Title, User, UserTitleState
from app.schemas.user_library import UserTitleStateRead, UserTitleStateUpsert

router = APIRouter()


def get_title_or_404(db: Session, title_id: str) -> Title:
    title = db.scalar(select(Title).where(Title.id == title_id))
    if not title:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Title not found")
    return title


def get_user_title_state_or_404(db: Session, user_id: str, title_id: str) -> UserTitleState:
    state = db.scalar(
        select(UserTitleState)
        .where(UserTitleState.user_id == user_id, UserTitleState.title_id == title_id)
        .options(selectinload(UserTitleState.title))
    )
    if not state:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User title state not found")
    return state


@router.get("/title-states", response_model=list[UserTitleStateRead])
def list_user_title_states(
    watchlist_only: bool = Query(default=False),
    favorites_only: bool = Query(default=False),
    db: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> list[UserTitleState]:
    stmt = (
        select(UserTitleState)
        .where(UserTitleState.user_id == current_user.id)
        .options(selectinload(UserTitleState.title))
        .order_by(UserTitleState.updated_at.desc())
    )
    if watchlist_only:
        stmt = stmt.where(UserTitleState.in_watchlist.is_(True))
    if favorites_only:
        stmt = stmt.where(UserTitleState.is_favorite.is_(True))
    return list(db.scalars(stmt).all())


@router.put("/title-states/{title_id}", response_model=UserTitleStateRead)
def upsert_user_title_state(
    title_id: str,
    payload: UserTitleStateUpsert,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> UserTitleState:
    title = get_title_or_404(db, title_id)
    state = db.scalar(
        select(UserTitleState).where(
            UserTitleState.user_id == current_user.id,
            UserTitleState.title_id == title.id,
        )
    )

    if not state:
        state = UserTitleState(
            user_id=current_user.id,
            title_id=title.id,
            in_watchlist=True if payload.in_watchlist is None else payload.in_watchlist,
            is_favorite=payload.is_favorite if payload.is_favorite is not None else False,
            rating=payload.rating,
            note=payload.note,
        )
        db.add(state)
    else:
        updates = payload.model_dump(exclude_unset=True)
        for field, value in updates.items():
            setattr(state, field, value)

    db.commit()
    return get_user_title_state_or_404(db, current_user.id, title.id)


@router.delete("/title-states/{title_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_title_state(
    title_id: str,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(get_current_user),
) -> None:
    state = db.scalar(
        select(UserTitleState).where(
            UserTitleState.user_id == current_user.id,
            UserTitleState.title_id == title_id,
        )
    )
    if not state:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User title state not found")
    db.delete(state)
    db.commit()
