from django.shortcuts import render
from django.http import JsonResponse

from utils_analyzer.character_analyzer import user_info
from utils_analyzer.character_analyzer import user_character
from utils_analyzer.character_analyzer import year_character
from utils_analyzer.character_analyzer import month_character
from utils_analyzer.character_analyzer import user_projects
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

