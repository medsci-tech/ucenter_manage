import requests
import random
import datetime
from models.managers import Manager


api_host = r'http://sms-api.luosimao.com/v1/send.json'
api_key = r'key-4efc7922b1bc90b949a2fa073519eb61'


def generate_key():
    code_list = list()
    for i in range(10):
        code_list.append(str(i))
    for i in range(ord('a'), ord('z')):
        code_list.append(chr(i))

    my_list = random.sample(code_list, 6)
    my_code = ''.join(my_list)
    return my_code


def send_message(phone):
    global api_host
    global api_key

    cmd_str = api_host
    auth_tuple = ("api", api_key)

    key = generate_key()
    data_dict = dict()
    data_dict['mobile'] = phone
    data_dict['message'] = '{key}【迈德科技】'.format(key=key)

    response = requests.post(cmd_str, auth=auth_tuple, data=data_dict, timeout=3, verify=False)
    if response.json()['error'] != 0:
        return None

    return key


def update_user(phone, code):
    try:
        user = Manager.objects.get(phone=phone)
    except:
        return False
    user.code = code
    user.update_time = datetime.datetime.now()
    user.save()
    return True


def check_user(phone, code):
    try:
        user = Manager.objects.get(phone=phone)
    except:
        return False

    if user.code != code:
        return False

    time_diff = datetime.datetime.now() - user.update_time
    if time_diff.seconds > 180:
        return False

    return True
