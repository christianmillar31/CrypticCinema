def test_title_crud_flow(client):
    create_response = client.post(
        "/v1/titles",
        json={
            "name": "Mulholland Drive",
            "content_type": "movie",
            "release_year": 2001,
            "runtime_minutes": 147,
        },
    )
    assert create_response.status_code == 201
    created = create_response.json()
    title_id = created["id"]
    assert created["slug"] == "mulholland-drive"
    slug = created["slug"]

    list_response = client.get("/v1/titles")
    assert list_response.status_code == 200
    assert len(list_response.json()) == 1

    by_slug_response = client.get(f"/v1/titles/by-slug/{slug}")
    assert by_slug_response.status_code == 200
    assert by_slug_response.json()["id"] == title_id

    get_response = client.get(f"/v1/titles/{title_id}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Mulholland Drive"

    update_response = client.patch(
        f"/v1/titles/{title_id}",
        json={"name": "Mulholland Dr.", "release_year": 2002},
    )
    assert update_response.status_code == 200
    updated = update_response.json()
    assert updated["name"] == "Mulholland Dr."
    assert updated["release_year"] == 2002

    delete_response = client.delete(f"/v1/titles/{title_id}")
    assert delete_response.status_code == 204

    after_delete_response = client.get(f"/v1/titles/{title_id}")
    assert after_delete_response.status_code == 404
