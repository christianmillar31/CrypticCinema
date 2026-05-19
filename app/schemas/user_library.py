from datetime import datetime
from typing import Optional

from pydantic import Field

from app.db.models import TitleType
from app.schemas.common import ORMModel


class UserTitleStateUpsert(ORMModel):
    in_watchlist: Optional[bool] = None
    is_favorite: Optional[bool] = None
    rating: Optional[int] = Field(default=None, ge=1, le=10)
    note: Optional[str] = Field(default=None, max_length=280)


class UserTitleStateTitle(ORMModel):
    id: str
    name: str
    slug: str
    content_type: TitleType
    release_year: Optional[int]
    runtime_minutes: Optional[int]
    poster_url: Optional[str]


class UserTitleStateRead(ORMModel):
    id: str
    in_watchlist: bool
    is_favorite: bool
    rating: Optional[int]
    note: Optional[str]
    title: UserTitleStateTitle
    created_at: datetime
    updated_at: datetime
