from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from utils_analyzer.members import *

from utils_common.auth_wrapper import auth_wrapper
from utils_common.django_excel import *
from utils_common.pagination import paginationForMime


@auth_wrapper
def index(request):
    req = request.GET
    # return HttpResponse(req)
    data = form_user_list(req)
    page = request.GET.get('page', 1)  # 获取页码
    pageData = paginationForMime(page=page, data=data, request=req)

    return render(request, 'members.html', {
        'pageData': pageData,
        'data_list': data.get('list'),
        'reqList': req,
    })


@auth_wrapper
def user_export(request):
    columns = [
        '手机号',
        '角色',
        '迈豆数',
        '注册时间',
    ]
    req = request.GET
    # 查询结果
    rows = export_user_list(req)
    response = import_response('member_list')
    excel = export_excel(columns, rows)
    excel.save(response)
    return response
