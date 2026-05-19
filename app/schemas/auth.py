from datetime import datetime

from pydantic import Field

from app.schemas.common import ORMModel


class UserRegister(ORMModel):
    email: str = Field(min_length=5, max_length=255)
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=8, max_length=128)


class UserRead(ORMModel):
    id: str
    email: str
    username: str
    is_active: bool
    created_at: datetime
    updated_at: datetime


class AccessToken(ORMModel):
    access_token: str
    token_type: str = "bearer"
