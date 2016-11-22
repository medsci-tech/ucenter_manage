from django.shortcuts import render
from django.http import JsonResponse
from utils_common.message_sender import send_message
from utils_common.message_sender import check_user


# Create your views here.
def index(request):
    return render(request, 'login.html')


def get_code(request, phone):
    ret = send_message(phone)
    if not ret:
        return JsonResponse({'error': 1})
    return JsonResponse({'error': 0})


def check_code(request, phone, code):
    ret = check_user(phone, code)
    if not ret:
        return JsonResponse({'error': 1})
    return JsonResponse({'error': 0})
