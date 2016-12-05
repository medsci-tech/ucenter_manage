from django.http import HttpResponseRedirect


def is_login(request):
    user_phone = request.session.get('user_phone', False)
    if user_phone:
        return True
    return False
    # return True
    

def auth_wrapper(function):
    def inner(request, *arg, **kwargs):
        if is_login(request):
            temp_ret = function(request, *arg, **kwargs)
            return temp_ret
        else:
            return HttpResponseRedirect('/login/')
    return inner
