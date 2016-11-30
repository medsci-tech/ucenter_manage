from models import User
import datetime
from mongoengine import Q


def _user_list(res_params):
    phone = res_params.get('phone')
    role = res_params.get('role')
    start_time = res_params.get('start_time')
    end_time = res_params.get('end_time')

    params = dict()
    if phone:
        params['phone'] = phone
    elif role or start_time or end_time:
        if role:
            params['role'] = role
        if start_time:
            start_time_obj = datetime.datetime.strptime(start_time, '%Y-%m-%d')
            params['create_time'] = {'$gte': start_time_obj}
        if end_time:
            end_time_obj = datetime.datetime.strptime(end_time, '%Y-%m-%d')
            if 'create_time' in params.keys():
                params['create_time']['$lte'] = end_time_obj
            else:
                params['create_time'] = {'$lte': end_time_obj}
    return params


def form_user_list(res_params=None):
    params = _user_list(res_params)
    page = res_params.get('page')
    if page:
        page = int(res_params.get('page'))
    else:
        page = 1
    offset = (page - 1) * 20
    limit = page * 20
    if not params:
        ret = User.objects.filter().order_by('id')[offset:limit]
        ret_count = User.objects.all().count()
    else:
        ret = User.objects(__raw__=params).order_by('id')[offset:limit]
        ret_count = User.objects(__raw__=params).count()
    return {'list': list(ret), 'count': ret_count}


def export_user_list(res_params=None):
    params = _user_list(res_params)
    if not params:
        ret = User.objects.all()
    else:
        ret = User.objects(__raw__=params).only('phone', 'role', 'total_beans', 'create_time')
    return list(ret)
