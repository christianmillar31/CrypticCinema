def create_title(client, name: str) -> str:
    response = client.post("/v1/titles", json={"name": name, "content_type": "movie"})
    assert response.status_code == 201
    return response.json()["id"]


def test_collection_flow(client):
    first_title_id = create_title(client, "The Cabinet of Dr. Caligari")
    second_title_id = create_title(client, "Possession")

    collection_response = client.post(
        "/v1/collections",
        json={"title": "Late Night Mind-Benders"},
    )
    assert collection_response.status_code == 201
    collection = collection_response.json()
    collection_id = collection["id"]
    collection_slug = collection["slug"]
    assert collection["items"] == []

    by_slug = client.get(f"/v1/collections/by-slug/{collection_slug}")
    assert by_slug.status_code == 200
    assert by_slug.json()["id"] == collection_id

    add_first = client.post(
        f"/v1/collections/{collection_id}/titles",
        json={"title_id": first_title_id},
    )
    assert add_first.status_code == 200
    first_state = add_first.json()
    assert len(first_state["items"]) == 1
    assert first_state["items"][0]["position"] == 1

    add_second = client.post(
        f"/v1/collections/{collection_id}/titles",
        json={"title_id": second_title_id, "position": 1, "note": "Open with this"},
    )
    assert add_second.status_code == 200
    second_state = add_second.json()
    assert len(second_state["items"]) == 2
    assert second_state["items"][0]["title"]["id"] == second_title_id
    assert second_state["items"][0]["position"] == 1
    assert second_state["items"][1]["position"] == 2

    remove_first = client.delete(f"/v1/collections/{collection_id}/titles/{second_title_id}")
    assert remove_first.status_code == 200
    final_state = remove_first.json()
    assert len(final_state["items"]) == 1
    assert final_state["items"][0]["title"]["id"] == first_title_id
    assert final_state["items"][0]["position"] == 1
