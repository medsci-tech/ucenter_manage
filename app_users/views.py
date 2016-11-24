from django.shortcuts import render
from django.http import JsonResponse
from utils_analyzer.user_analyzer import year_user
from utils_analyzer.user_analyzer import month_user
from utils_analyzer.user_analyzer import day_user
from utils_analyzer.bean_analyzer import year_bean
from utils_analyzer.bean_analyzer import month_bean
from utils_analyzer.bean_analyzer import day_bean
from utils_analyzer.user_list import user_list

from utils_common.auth_wrapper import auth_wrapper


# Create your views here.
@auth_wrapper
def index(request):
    return render(request, 'users.html')

@auth_wrapper
def list(request):
    ret = user_list()
    return render(request, 'user_list.html',{
        'object_list': ret
    })

@auth_wrapper
def users_year_user(request, year):
    ret = year_user(int(year), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def users_month_user(request, year):
    ret = month_user(int(year), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def users_day_user(request, year, month):
    ret = day_user(int(year), int(month), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def users_year_bean(request, year):
    ret = year_bean(int(year), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def users_month_bean(request, year):
    ret = month_bean(int(year), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def users_day_bean(request, year, month):
    ret = day_bean(int(year), int(month), user_role='user')
    response = JsonResponse(ret, safe=False)
    return response

