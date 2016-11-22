from django.shortcuts import render
from django.http import HttpResponse
from .models import Manager
from utils_common.message_sender import send_message
from utils_common.message_sender import check_user


# Create your views here.
def index(request):
    manager = Manager()
    manager.name = 'xsm'
    manager.phone = '15623093771'
    manager.save()
    ret = Manager.objects.all()
    for user in ret:
        print(user.name)
    return HttpResponse('index')


def get_code(request, phone):
    ret = send_message(phone)
    if not ret:
        pass
    return HttpResponse('get_code')


def check_code(request, phone, code):
    ret = check_user(phone, code)
    if not ret:
        pass
    return HttpResponse('check_code')