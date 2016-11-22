from django.shortcuts import render
from django.http import HttpResponse

from utils_analyzer.character_analyzer import user_info
from utils_analyzer.character_analyzer import user_character
from utils_analyzer.character_analyzer import year_character
from utils_analyzer.character_analyzer import month_character
from utils_analyzer.character_analyzer import user_projects


# Create your views here.
def index(request, phone):
    ret = user_info(phone)
    print(ret)
    return HttpResponse('index')


def characters(request, phone):
    ret = user_character(phone)
    print(ret)
    return HttpResponse('characters')


def projects(request, phone):
    ret = user_projects(phone)
    print(ret)
    return HttpResponse('projects')


def user_year_character(request, phone, year):
    ret = year_character(phone, int(year))
    print(ret)
    return HttpResponse('user_year_character')


def user_month_character(request, phone, year):
    ret = month_character(phone, int(year))
    print(ret)
    return HttpResponse('user_month_character')


