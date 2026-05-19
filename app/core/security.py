from datetime import datetime, timedelta, timezone
import base64
import hashlib
import hmac
import os
from typing import Any, Optional

import jwt

from app.core.config import get_settings

PBKDF2_ROUNDS = 390000
PBKDF2_ALGORITHM = "sha256"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        scheme, rounds_text, salt_b64, digest_b64 = hashed_password.split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False
        rounds = int(rounds_text)
    except ValueError:
        return False

    salt = base64.b64decode(salt_b64.encode("utf-8"))
    expected_digest = base64.b64decode(digest_b64.encode("utf-8"))
    actual_digest = hashlib.pbkdf2_hmac(
        PBKDF2_ALGORITHM,
        plain_password.encode("utf-8"),
        salt,
        rounds,
    )
    return hmac.compare_digest(actual_digest, expected_digest)


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac(
        PBKDF2_ALGORITHM,
        password.encode("utf-8"),
        salt,
        PBKDF2_ROUNDS,
    )
    salt_b64 = base64.b64encode(salt).decode("utf-8")
    digest_b64 = base64.b64encode(digest).decode("utf-8")
    return f"pbkdf2_sha256${PBKDF2_ROUNDS}${salt_b64}${digest_b64}"


def create_access_token(subject: str, expires_minutes: Optional[int] = None) -> str:
    settings = get_settings()
    lifetime_minutes = expires_minutes or settings.access_token_expire_minutes
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=lifetime_minutes)
    payload: dict[str, Any] = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
