from datetime import datetime
from typing import Optional

from pydantic import Field

from app.db.models import TitleType
from app.schemas.common import ORMModel


class CollectionCreate(ORMModel):
    title: str = Field(min_length=1, max_length=200)
    slug: Optional[str] = Field(default=None, min_length=1, max_length=180)
    description: Optional[str] = Field(default=None, max_length=10000)


class CollectionSummary(ORMModel):
    id: str
    title: str
    slug: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime


class CollectionTitleAdd(ORMModel):
    title_id: str = Field(min_length=1, max_length=36)
    position: Optional[int] = Field(default=None, ge=1)
    note: Optional[str] = Field(default=None, max_length=280)


class CollectionTitleTitle(ORMModel):
    id: str
    name: str
    slug: str
    content_type: TitleType
    release_year: Optional[int]
    runtime_minutes: Optional[int]
    poster_url: Optional[str]


class CollectionTitleRead(ORMModel):
    id: str
    position: int
    note: Optional[str]
    title: CollectionTitleTitle


class CollectionDetail(ORMModel):
    id: str
    title: str
    slug: str
    description: Optional[str]
    items: list[CollectionTitleRead]
    created_at: datetime
    updated_at: datetime
