from mongoengine import Q
from models import User
from models import Bean
from models.relationships import Relationship
import math


def user_info(phone):
    try:
        ret = User.objects.get(phone=phone)
    except:
        ret = None
    ret_data = {}
    if ret:
        for row in ret:
            ret_data[str(row)] = str(ret[row])
    return ret_data


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


def user_bean_list(phone, page):
    limit = 20
    page = int(page) if int(page) > 1 else 1
    ret = Bean.objects(Q(user_phone=phone)).order_by('id')[(page-1) * limit: page * limit]
    ret_count = Bean.objects(Q(user_phone=phone)).count()
    return {'data': list(ret), 'count': math.ceil(ret_count / limit)}


def user_upstream_info(phone):
    try:
        relationship = Relationship.objects().get(downstream_phone=phone)
    except:
        return False
    if relationship:
        try:
            ret = User.objects().get(phone=relationship.get('upstream_phone'))
        except:
            ret = None
        ret_data = {}
        if ret:
            for row in ret:
                ret_data[str(row)] = str(ret[row])
        return ret_data
    else:
        return None


def user_downstream_info(phone):
    try:
        relationships = Relationship.objects().filter(upstream_phone=phone).order_by('id')
    except:
        relationships = None
    downstream_info = []
    if relationships:
        for relationship in relationships:
            try:
                ret = User.objects().get(phone=relationship.downstream_phone)
            except:
                ret = None
            if ret:
                ret_data = {}
                for row in ret:
                    ret_data[str(row)] = str(ret[row])
                downstream_info.append(ret_data)
    return downstream_info