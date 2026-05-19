from datetime import datetime
from typing import Optional

from pydantic import Field

from app.db.models import TitleType
from app.schemas.common import ORMModel


class TitleCreate(ORMModel):
    name: str = Field(min_length=1, max_length=255)
    slug: Optional[str] = Field(default=None, min_length=1, max_length=180)
    content_type: TitleType = TitleType.movie
    release_year: Optional[int] = Field(default=None, ge=1888, le=2100)
    runtime_minutes: Optional[int] = Field(default=None, ge=1, le=1000)
    synopsis: Optional[str] = Field(default=None, max_length=10000)
    poster_url: Optional[str] = Field(default=None, max_length=500)


class TitleUpdate(ORMModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    slug: Optional[str] = Field(default=None, min_length=1, max_length=180)
    content_type: Optional[TitleType] = None
    release_year: Optional[int] = Field(default=None, ge=1888, le=2100)
    runtime_minutes: Optional[int] = Field(default=None, ge=1, le=1000)
    synopsis: Optional[str] = Field(default=None, max_length=10000)
    poster_url: Optional[str] = Field(default=None, max_length=500)


class TitleRead(ORMModel):
    id: str
    name: str
    slug: str
    content_type: TitleType
    release_year: Optional[int]
    runtime_minutes: Optional[int]
    synopsis: Optional[str]
    poster_url: Optional[str]
    created_at: datetime
    updated_at: datetime
