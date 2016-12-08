from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
import json
from django.core import serializers
from models import User

from utils_analyzer.character_analyzer import user_info
from utils_analyzer.character_analyzer import user_character
from utils_analyzer.character_analyzer import year_character
from utils_analyzer.character_analyzer import month_character
from utils_analyzer.character_analyzer import user_projects
from utils_analyzer.character_analyzer import user_bean_list
from utils_analyzer.character_analyzer import user_upstream_info
from utils_analyzer.character_analyzer import user_downstream_info
from utils_common.auth_wrapper import auth_wrapper


# Create your views here.
@auth_wrapper
def index(request, phone):
    return render(request, 'character.html')


@auth_wrapper
def info(request, phone):
    ret = user_info(phone)
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def characters(request, phone):
    ret = user_character(phone)
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def projects(request, phone):
    ret = user_projects(phone)
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def user_year_character(request, phone, year):
    ret = year_character(phone, int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def user_month_character(request, phone, year):
    ret = month_character(phone, int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def bean_list(request, phone, page):
    ret = user_bean_list(phone, page)
    ret_rows = []
    if ret:
        for row in ret.get('data'):
            temp_data = {
                'project_name_en': row['project_name_en'],
                'posted_beans': row['posted_beans'],
                'saved_beans': row['saved_beans'],
                'rule_name_en': row['rule_name_en'],
                'rule_type_name_en': row['rule_type_name_en'],
                'create_time': row['create_time'].strftime('%Y-%m-%d %H:%M:%S'),
            }
            ret_rows.append(temp_data)
    response = JsonResponse({'rows': ret_rows, 'count': ret.get('count')}, safe=False)
    return response


@auth_wrapper
def upstream_downstream_beans(request, phone):
    return_data = {
        'upstream': {},
        'downstream': [],
        'user_info': {},
    }
    # user_info
    user = user_info(phone)
    if user:
        return_data.update(user_info=user)

    # upstream_info
    upstream = user_upstream_info(phone)
    if upstream:
        return_data.update(upstream=upstream)

    # downstream_info
    downstream = user_downstream_info(phone)
    if downstream:
        return_data.update(downstream=downstream)

    return JsonResponse(return_data)