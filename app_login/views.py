from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from utils_common.message_sender import send_message
from utils_common.message_sender import update_user
from utils_common.message_sender import check_user


# Create your views here.
@csrf_exempt
def index(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    phone = request.POST.get('phone')
    code = request.POST.get('code')
    print('phone is {phone}, code is {code}'.format(phone=phone, code=code))

    ret = check_user(phone, code)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'check error'})
    else:
        request.session['user_phone'] = phone
        return JsonResponse({'error': 0, 'msg': 'check success'})


@csrf_exempt
def get_code(request, phone):
    key = send_message(phone)
    if key == False:
        return JsonResponse({'error': 1, 'msg': 'check user error'})
    if not key:
        return JsonResponse({'error': 1, 'msg': 'send message error'})

    ret = update_user(phone, key)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'get user error'})

    return JsonResponse({'error': 0})


@csrf_exempt
def check_code(request, phone, code):
    ret = check_user(phone, code)
    if not ret:
        return JsonResponse({'error': 1, 'msg': 'check error'})
    request.session['user_phone'] = phone
    return HttpResponseRedirect('/home/')


@csrf_exempt
def logout(request):
    try:
        del request.session['user_phone']
    except:
        pass
    return HttpResponseRedirect('/')

