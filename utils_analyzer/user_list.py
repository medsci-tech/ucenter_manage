from models import User
import datetime
# from django.http import HttpResponse
# import dateutil.parser


def _user_list(res_params):
    phone = res_params.get('phone')
    start_time = res_params.get('start_time')
    end_time = res_params.get('end_time')
    role = res_params.get('role')
    params = {}
    if phone:
        params = {
            'phone': phone
        }
    elif role or start_time or end_time:
        if role:
            params.update(role=role)
        if start_time:
            params.update(create_time={'$gt': datetime.datetime.strptime(start_time, '%Y-%m-%d').isoformat()})
            # params.update(create_time={'$gt': dateutil.parser.parse(start_time)})
        if end_time:
            params.update(create_time={'$lt': (datetime.datetime.strptime(end_time, '%Y-%m-%d') + datetime.timedelta(days=1)).isoformat()})
    return params


def form_user_list(res_params=None):
    params = _user_list(res_params)
    # return params
    ret = User.objects.filter(**params).order_by('id')
    return list(ret)


def export_user_list(res_params=None):
    params = _user_list(res_params)
    ret = User.objects.filter(**params).values_list('phone', 'role', 'total_beans', 'create_time')
    return list(ret)
