import enum
import uuid
from typing import Optional

from sqlalchemy import Boolean, Enum, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class TitleType(str, enum.Enum):
    movie = "movie"
    series = "series"
    short = "short"
    documentary = "documentary"
    other = "other"


class Title(Base, TimestampMixin):
    __tablename__ = "titles"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    slug: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    content_type: Mapped[TitleType] = mapped_column(
        Enum(TitleType, native_enum=False),
        nullable=False,
        default=TitleType.movie,
    )
    release_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    runtime_minutes: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    synopsis: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    poster_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    collection_links: Mapped[list["CollectionTitle"]] = relationship(
        back_populates="title",
        cascade="all, delete-orphan",
    )
    user_states: Mapped[list["UserTitleState"]] = relationship(
        back_populates="title",
        cascade="all, delete-orphan",
    )


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    title_states: Mapped[list["UserTitleState"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )


class Collection(Base, TimestampMixin):
    __tablename__ = "collections"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    slug: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    items: Mapped[list["CollectionTitle"]] = relationship(
        back_populates="collection",
        cascade="all, delete-orphan",
        order_by="CollectionTitle.position",
    )


class CollectionTitle(Base):
    __tablename__ = "collection_titles"
    __table_args__ = (
        UniqueConstraint("collection_id", "title_id", name="uq_collection_title_unique_link"),
    )

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    collection_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("collections.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("titles.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    position: Mapped[int] = mapped_column(Integer, nullable=False)
    note: Mapped[Optional[str]] = mapped_column(String(280), nullable=True)

    collection: Mapped[Collection] = relationship(back_populates="items")
    title: Mapped[Title] = relationship(back_populates="collection_links")


class UserTitleState(Base, TimestampMixin):
    __tablename__ = "user_title_states"
    __table_args__ = (UniqueConstraint("user_id", "title_id", name="uq_user_title_state"),)

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    user_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("titles.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    in_watchlist: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_favorite: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    rating: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    note: Mapped[Optional[str]] = mapped_column(String(280), nullable=True)

    user: Mapped[User] = relationship(back_populates="title_states")
    title: Mapped[Title] = relationship(back_populates="user_states")
