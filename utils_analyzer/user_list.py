from models import User


def user_list(user_role=None):

    if user_role:
        ret = User.objects().filter(role='user').order_by('id')[:10]
    else:
        ret = User.objects().filter().order_by('id')[:10]
    return list(ret)


