from django.shortcuts import render
from django.http import JsonResponse
from utils_analyzer.user_analyzer import all_user
from utils_analyzer.user_analyzer import year_user
from utils_analyzer.user_analyzer import month_user
from utils_analyzer.user_analyzer import day_user
from utils_analyzer.bean_analyzer import all_bean
from utils_analyzer.bean_analyzer import year_bean
from utils_analyzer.bean_analyzer import month_bean
from utils_analyzer.bean_analyzer import day_bean
from utils_common.auth_wrapper import auth_wrapper


# Create your views here.
@auth_wrapper
def index(request):
    return render(request, 'home.html')


@auth_wrapper
def home_all_user(request):
    ret = all_user()
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_year_user(request, year):
    ret = year_user(int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_month_user(request, year):
    ret = month_user(int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_day_user(request, year, month):
    ret = day_user(int(year), int(month))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_all_bean(request):
    ret = all_bean()
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_year_bean(request, year):
    ret = year_bean(int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_month_bean(request, year):
    ret = month_bean(int(year))
    response = JsonResponse(ret, safe=False)
    return response


@auth_wrapper
def home_day_bean(request, year, month):
    ret = day_bean(int(year), int(month))
    response = JsonResponse(ret, safe=False)
    return response

