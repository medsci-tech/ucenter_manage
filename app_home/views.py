from django.shortcuts import render
from django.http import HttpResponse
from utils_analyzer.user_analyzer import all_user
from utils_analyzer.user_analyzer import year_user
from utils_analyzer.user_analyzer import month_user
from utils_analyzer.user_analyzer import day_user
from utils_analyzer.bean_analyzer import all_bean
from utils_analyzer.bean_analyzer import year_bean
from utils_analyzer.bean_analyzer import month_bean
from utils_analyzer.bean_analyzer import day_bean


# Create your views here.
def index(request):
    ret = all_user()
    print(ret)
    return render(request, 'home.html', ret)


def home_year_user(request, year):
    ret = year_user(int(year))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_year_user')


def home_month_user(request, year):
    ret = month_user(int(year))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_month_user')


def home_day_user(request, year, month):
    ret = day_user(int(year), int(month))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_day_user')


def home_all_bean(request):
    ret = all_bean()
    print('*' * 10)
    print(ret)
    return HttpResponse('home_all_bean')


def home_year_bean(request, year):
    ret = year_bean(int(year))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_year_bean')


def home_month_bean(request, year):
    ret = month_bean(int(year))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_month_bean')


def home_day_bean(request, year, month):
    ret = day_bean(int(year), int(month))
    print('*' * 10)
    print(ret)
    return HttpResponse('home_day_bean')





