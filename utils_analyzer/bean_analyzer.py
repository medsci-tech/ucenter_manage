from models import Bean


def all_bean(user_role=None):
    group_doc = {'$group': {
        '_id': '$rule_type_name_en',
        'count': {'$sum': '$saved_beans'}}}
    project_doc = {'$project': {
        'type': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(group_doc)
    aggregate_list.append(project_doc)

    if user_role:
        ret = Bean.objects(user_role=user_role).aggregate(*aggregate_list)
    else:
        ret = Bean.objects().aggregate(*aggregate_list)
    return list(ret)


def year_bean(year, user_role=None):
    project_year_doc = {'$project': {
        'rule_type_name_en': 1,
        'saved_beans': 1,
        'year': {'$year': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_rule_type_doc = {'$group': {
        '_id': '$rule_type_name_en',
        'count': {'$sum': '$saved_beans'}}}
    project_rule_type_doc = {'$project': {
        'type': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_rule_type_doc)
    aggregate_list.append(project_rule_type_doc)

    if user_role:
        ret = Bean.objects(user_role=user_role).aggregate(*aggregate_list)
    else:
        ret = Bean.objects().aggregate(*aggregate_list)
    return list(ret)


def month_bean(year, user_role=None):
    project_month_doc = {'$project': {
        'rule_type_name_en': 1,
        'saved_beans': 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'}}}
    match_year_doc = {'$match': {'year': year}}
    group_rule_type_doc = {'$group': {
        '_id': {'type': '$rule_type_name_en', 'month': '$month'},
        'count': {'$sum': '$saved_beans'}}}
    project_rule_type_doc = {'$project': {
        'type': '$_id.type',
        'month': '$_id.month',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_month_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_rule_type_doc)
    aggregate_list.append(project_rule_type_doc)

    if user_role:
        ret = Bean.objects(user_role=user_role).aggregate(*aggregate_list)
    else:
        ret = Bean.objects().aggregate(*aggregate_list)
    return list(ret)


def day_bean(year, month, user_role=None):
    project_day_doc = {'$project': {
        'rule_type_name_en': 1,
        'saved_beans': 1,
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'},
        'day': {'$dayOfMonth': '$create_time'}}}
    match_month_doc = {'$match': {'year': year, 'month': month}}
    group_rule_type_doc = {'$group': {
        '_id': {'type': '$rule_type_name_en', 'day': '$day'},
        'count': {'$sum': '$saved_beans'}}}
    project_rule_type_doc = {'$project': {
        'type': '$_id.type',
        'day': '$_id.day',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_day_doc)
    aggregate_list.append(match_month_doc)
    aggregate_list.append(group_rule_type_doc)
    aggregate_list.append(project_rule_type_doc)

    if user_role:
        ret = Bean.objects(user_role=user_role).aggregate(*aggregate_list)
    else:
        ret = Bean.objects().aggregate(*aggregate_list)
    return list(ret)

