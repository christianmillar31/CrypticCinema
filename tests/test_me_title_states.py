def create_title(client, name: str) -> str:
    response = client.post("/v1/titles", json={"name": name, "content_type": "movie"})
    assert response.status_code == 201
    return response.json()["id"]


def register_and_login(client) -> str:
    register = client.post(
        "/v1/auth/register",
        json={
            "email": "library@example.com",
            "username": "libraryuser",
            "password": "secure-pass-123",
        },
    )
    assert register.status_code == 201
    token = client.post(
        "/v1/auth/token",
        data={"username": "libraryuser", "password": "secure-pass-123"},
    )
    assert token.status_code == 200
    return token.json()["access_token"]


def test_user_title_state_flow(client):
    token = register_and_login(client)
    headers = {"Authorization": f"Bearer {token}"}

    first_title_id = create_title(client, "Stalker")
    second_title_id = create_title(client, "Persona")

    add_first = client.put(
        f"/v1/me/title-states/{first_title_id}",
        json={"in_watchlist": True, "note": "Watch this weekend"},
        headers=headers,
    )
    assert add_first.status_code == 200
    assert add_first.json()["in_watchlist"] is True

    add_second = client.put(
        f"/v1/me/title-states/{second_title_id}",
        json={"is_favorite": True, "rating": 10},
        headers=headers,
    )
    assert add_second.status_code == 200
    assert add_second.json()["is_favorite"] is True

    all_states = client.get("/v1/me/title-states", headers=headers)
    assert all_states.status_code == 200
    assert len(all_states.json()) == 2

    watchlist_only = client.get("/v1/me/title-states?watchlist_only=true", headers=headers)
    assert watchlist_only.status_code == 200
    assert len(watchlist_only.json()) == 2

    favorites_only = client.get("/v1/me/title-states?favorites_only=true", headers=headers)
    assert favorites_only.status_code == 200
    assert len(favorites_only.json()) == 1
    assert favorites_only.json()[0]["title"]["id"] == second_title_id

    delete_state = client.delete(f"/v1/me/title-states/{first_title_id}", headers=headers)
    assert delete_state.status_code == 204

    all_after_delete = client.get("/v1/me/title-states", headers=headers)
    assert all_after_delete.status_code == 200
    assert len(all_after_delete.json()) == 1
