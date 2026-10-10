"""Matching #3 teaching artifact, Version A (intentionally incorrect)."""


def new_state(fixture):
    return {
        "users": fixture["users"],
        "likes": list(fixture["likes"]),
        "matches": list(fixture["matches"]),
    }


def like(state, actor, target):
    action = [actor, target]
    if action not in state["likes"]:
        state["likes"].append(action)

    # Version A teaching defect: any Like creates a match.
    if action in state["likes"]:
        pair = sorted([actor, target])
        if not any(record["users"] == pair for record in state["matches"]):
            match_id = f"M{len(state['matches']) + 1:02d}"
            state["matches"].append({"id": match_id, "users": pair})
