def register_user(client):
    response = client.post(
        "/v1/auth/register",
        json={
            "email": "cinephile@example.com",
            "username": "cinephile",
            "password": "secure-pass-123",
        },
    )
    assert response.status_code == 201
    return response.json()


def login_user(client, username: str = "cinephile", password: str = "secure-pass-123") -> str:
    response = client.post(
        "/v1/auth/token",
        data={"username": username, "password": password},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_auth_register_login_me(client):
    created_user = register_user(client)
    assert created_user["email"] == "cinephile@example.com"

    duplicate_response = client.post(
        "/v1/auth/register",
        json={
            "email": "cinephile@example.com",
            "username": "cinephile2",
            "password": "secure-pass-123",
        },
    )
    assert duplicate_response.status_code == 409

    token = login_user(client, username="cinephile@example.com")
    me_response = client.get(
        "/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert me_response.status_code == 200
    me = me_response.json()
    assert me["username"] == "cinephile"
