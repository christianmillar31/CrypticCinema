from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.collections import router as collections_router
from app.api.routes.health import router as health_router
from app.api.routes.me import router as me_router
from app.api.routes.titles import router as titles_router

api_router = APIRouter(prefix="/v1")
api_router.include_router(health_router, tags=["health"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(me_router, prefix="/me", tags=["me"])
api_router.include_router(titles_router, prefix="/titles", tags=["titles"])
api_router.include_router(collections_router, prefix="/collections", tags=["collections"])
