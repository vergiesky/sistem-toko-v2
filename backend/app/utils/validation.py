def get_json_dict(request):
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None
    return data


def require_fields(data, fields):
    missing = [field for field in fields if field not in data]
    return missing
