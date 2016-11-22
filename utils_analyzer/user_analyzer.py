from models import User


def all_user(user_role=None):
    group_doc = {'$group': {
        '_id': '$role',
        'count': {'$sum': 1}}}
    project_doc = {'$project': {
        'role': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(group_doc)
    aggregate_list.append(project_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def year_user(year, user_role=None):
    project_year_doc = {'$project': {
        'role': 1,
        'year': {'$year': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_role_doc = {'$group': {
        '_id': '$role',
        'count': {'$sum': 1}}}
    project_role_doc = {'$project': {
        'role': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_role_doc)
    aggregate_list.append(project_role_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def month_user(year, user_role=None):
    project_month_doc = {'$project': {
        'role': 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_role_doc = {'$group': {
        '_id': {'role': '$role', 'month': '$month'},
        'count': {'$sum': 1}}}
    project_role_doc = {'$project': {
        'role': '$_id.role',
        'month': '$_id.month',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_month_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_role_doc)
    aggregate_list.append(project_role_doc)


    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def day_user(year, month, user_role=None):
    project_day_doc = {'$project': {
        'role': 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'},
        'day': {'$dayOfMonth': '$create_time'}}}
    match_month_doc = {'$match': {
        'year': year,
        'month': month}}
    group_role_doc = {'$group': {
        '_id': {'role': '$role', 'day': '$day'},
        'count': {'$sum': 1}}}
    project_role_doc = {'$project': {
        'role': '$_id.role',
        'day': '$_id.day',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_day_doc)
    aggregate_list.append(match_month_doc)
    aggregate_list.append(group_role_doc)
    aggregate_list.append(project_role_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)
