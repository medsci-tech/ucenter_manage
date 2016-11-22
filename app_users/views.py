from django.shortcuts import render
from django.http import HttpResponse
from utils_analyzer.user_analyzer import year_user
from utils_analyzer.user_analyzer import month_user
from utils_analyzer.user_analyzer import day_user
from utils_analyzer.bean_analyzer import year_bean
from utils_analyzer.bean_analyzer import month_bean
from utils_analyzer.bean_analyzer import day_bean


# Create your views here.
def index(request, year):
    ret = year_user(int(year), user_role='user')
    print('*' * 10)
    print(ret)
    return render(request, 'users.html')


def users_month_user(request, year):
    ret = month_user(int(year), user_role='user')
    print('*' * 10)
    print(ret)
    return HttpResponse('users_month_user')


def users_day_user(request, year, month):
    ret = day_user(int(year), int(month), user_role='user')
    print('*' * 10)
    print(ret)
    return HttpResponse('users_day_user')


def users_year_bean(request, year):
    ret = year_bean(int(year), user_role='user')
    print('*' * 10)
    print(ret)
    return HttpResponse('users_year_bean')


def users_month_bean(request, year):
    ret = month_bean(int(year), user_role='user')
    print('*' * 10)
    print(ret)
    return HttpResponse('users_month_bean')


def users_day_bean(request, year, month):
    ret = day_bean(int(year), int(month), user_role='user')
    print('*' * 10)
    print(ret)
    return HttpResponse('users_day_bean')

