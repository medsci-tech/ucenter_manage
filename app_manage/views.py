from django.shortcuts import render
from django.http import HttpResponse
from .models import Manager


# Create your views here.
def index(request):
    manager = Manager()
    manager.name = 'xsm'
    manager.phone = '15623093771'
    manager.save()
    ret = Manager.objects.all()
    for user in ret:
        print(user.name)
    return HttpResponse('home_day_bean')