from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from utils_common.message_sender import send_message
from utils_common.message_sender import update_user
from utils_common.message_sender import check_user


# Create your views here.
def index(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    phone = request.POST.get('phone')
    code = request.POST.get('code')

    ret = check_user(phone, code)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'check error'})
    request.session['user_phone'] = phone
    return HttpResponseRedirect('/home/')


def get_code(request, phone):
    key = send_message(phone)
    if not key:
        return JsonResponse({'error': 1, 'msg': 'send message error'})

    ret = update_user(phone, key)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'get user error'})

    return JsonResponse({'error': 0})


def check_code(request, phone, code):
    ret = check_user(phone, code)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'check error'})
    request.session['user_phone'] = phone
    return HttpResponseRedirect('/home/')
