from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from utils_analyzer.user_analyzer import year_user
from utils_analyzer.user_analyzer import month_user
from utils_analyzer.user_analyzer import day_user
from utils_analyzer.bean_analyzer import year_bean
from utils_analyzer.bean_analyzer import month_bean
from utils_analyzer.bean_analyzer import day_bean
from utils_analyzer.user_list import *

from utils_common.auth_wrapper import auth_wrapper
from utils_common.django_excel import *
from utils_common.pagination import paginationForMime

# Create your views here.
@auth_wrapper
def index(request):
    return render(request, 'users.html')


@auth_wrapper
def list(request):
    req = request.GET
    # return HttpResponse(req)
    data = form_user_list(req)
    page = request.GET.get('page', 1)  # 获取页码
    pageData = paginationForMime(page=page, data=data)

    return render(request, 'user_list.html', {
        'pageData': pageData,
        'reqList': req,
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


@auth_wrapper
def user_export(request):
    columns = [
        '手机号',
        '角色',
        '迈豆数',
        '注册时间',
    ]
    post = request.POST
    # 查询结果
    rows = export_user_list(**post)

    response = import_response('2016')
    excel = excel_export(columns, rows)
    excel.save(response)
    return response
