from models import User


def _user_list(phone=None, role=None, start_time=None, end_time=None):
    params = {}
    if phone:
        params = {
            'phone': phone
        }
    elif role or start_time or end_time:
        if role:
            params.update(role=role)
        if start_time:
            params.update(create_time={'$gt': start_time})
        if end_time:
            params.update(create_time={'$lt': end_time})
    return params


def form_user_list(phone=None, role=None, start_time=None, end_time=None):
    params = _user_list(phone, role, start_time, end_time)
    ret = User.objects.filter(**params).order_by('id')[:10]
    return list(ret)


def export_user_list(phone=None, role=None, start_time=None, end_time=None):
    params = _user_list(phone, role, start_time, end_time)
    ret = User.objects.filter(**params).values_list('phone', 'role', 'total_beans', 'create_time')[:10]
    return list(ret)
