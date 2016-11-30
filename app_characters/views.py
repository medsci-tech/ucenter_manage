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
from utils_common.auth_wrapper import auth_wrapper


# Create your views here.
@auth_wrapper
def index(request, phone):
    return render(request, 'character.html')


@auth_wrapper
def info(request, phone):
    ret = user_info(phone)
    ret_data = {}
    for row in ret:
        ret_data[str(row)] = str(ret[row])
    response = JsonResponse(ret_data, safe=False)
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
        for row in ret:
            temp_data = {
                'posted_beans': row['posted_beans'],
                'saved_beans': row['saved_beans'],
                'rule_name_en': row['rule_name_en'],
                'rule_type_name_en': row['rule_type_name_en'],
            }
            ret_rows.append(temp_data)
    response = JsonResponse(ret_rows, safe=False)
    return response