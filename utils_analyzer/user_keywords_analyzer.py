from models import User


def key_all_user(key, user_role=None):
    match_key_doc = {'$match': {key: {'$exists': 1}}}
    group_key_doc = {'$group': {
        '_id': ('$' + key),
        'count': {'$sum': 1}}}
    project_key_doc = {'$project': {
        key: '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(match_key_doc)
    aggregate_list.append(group_key_doc)
    aggregate_list.append(project_key_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def key_year_user(key, year, user_role=None):
    match_key_doc = {'$match': {key: {'$exists': 1}}}
    project_year_doc = {'$project': {
        key: 1,
        'year': {'$year': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_key_doc = {'$group': {
        '_id': ('$' + key),
        'count': {'$sum': 1}}}
    project_key_doc = {'$project': {
        key: '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(match_key_doc)
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_key_doc)
    aggregate_list.append(project_key_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def key_month_user(key, year, user_role=None):
    match_key_doc = {'$match': {key: {'$exists': 1}}}
    project_year_doc = {'$project': {
        key: 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_key_doc = {'$group': {
        '_id': {'month': '$month', key: ('$' + key)},
        'count': {'$sum': 1}}}
    project_key_doc = {'$project': {
        key: ('$_id.' + key),
        'month': '$_id.month',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(match_key_doc)
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_key_doc)
    aggregate_list.append(project_key_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)


def key_day_user(key, year, month, user_role=None):
    match_key_doc = {'$match': {key: {'$exists': 1}}}
    project_month_doc = {'$project': {
        key: 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'},
        'day': {'$dayOfMonth': '$create_time'}}}
    match_month_doc = {'$match': {'year': year, 'month': month}}
    group_key_doc = {'$group': {
        '_id': {'day': '$day', key: ('$' + key)},
        'count': {'$sum': 1}}}
    project_key_doc = {'$project': {
        key: ('$_id.' + key),
        'day': '$_id.day',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(match_key_doc)
    aggregate_list.append(project_month_doc)
    aggregate_list.append(match_month_doc)
    aggregate_list.append(group_key_doc)
    aggregate_list.append(project_key_doc)

    if user_role:
        ret = User.objects(role=user_role).aggregate(*aggregate_list)
    else:
        ret = User.objects().aggregate(*aggregate_list)
    return list(ret)
