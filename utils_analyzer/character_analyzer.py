from mongoengine import Q
from models import User
from models import Bean


def user_info(phone):
    user = User.objects.get(phone=phone)
    return list(user)


def user_character(phone):
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

    ret = Bean.objects(user_phone=phone).aggregate(*aggregate_list)
    return list(ret)


def user_projects(phone):
    group_doc = {'$group': {
        '_id': '$project_name_en',
        'count': {'$sum': '$saved_beans'}}}
    project_doc = {'$project': {
        'project_name': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(group_doc)
    aggregate_list.append(project_doc)

    ret = Bean.objects(user_phone=phone).aggregate(*aggregate_list)
    return list(ret)


def year_character(phone, year):
    project_year_doc = {'$project': {
        'year': {'$year': '$create_time'},
        'rule_type_name_en': 1,
        'saved_beans': 1}}
    match_year_doc = {'$match': {'year': year}}
    group_rule_type_doc = {'$group': {
        '_id': '$rule_type_name_en',
        'count': {'$sum': '$saved_beans'}}}
    project_rule_typ_doc = {'$project': {
        'type': '$_id',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_rule_type_doc)
    aggregate_list.append(project_rule_typ_doc)

    ret = Bean.objects(user_phone=phone).aggregate(*aggregate_list)
    return list(ret)


def month_character(phone, year):
    project_year_doc = {'$project': {
        'year': {'$year': '$create_time'},
        'month': {'$month': '$create_time'},
        'rule_type_name_en': 1,
        'saved_beans': 1}}
    match_year_doc = {'$match': {'year': year}}
    group_rule_type_doc = {'$group': {
        '_id': {'type': '$rule_type_name_en', 'month': '$month'},
        'count': {'$sum': '$saved_beans'}}}
    project_rule_typ_doc = {'$project': {
        'type': '$_id.type',
        'month': '$_id.month',
        'count': 1,
        '_id': 0}}

    aggregate_list = list()
    aggregate_list.append(project_year_doc)
    aggregate_list.append(match_year_doc)
    aggregate_list.append(group_rule_type_doc)
    aggregate_list.append(project_rule_typ_doc)

    ret = Bean.objects(user_phone=phone).aggregate(*aggregate_list)
    return list(ret)


def user_project_beans(phone, project):
    ret = Bean.objects(Q(user_phone=phone) & Q(project_name_en=project))
    for doc in ret:
        print(doc.project_name_en, end=';')
    return list(ret)


