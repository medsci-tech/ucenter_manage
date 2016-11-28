import datetime
from mongoengine import Document
from mongoengine import IntField
from mongoengine import DecimalField
from mongoengine import StringField
from mongoengine import DateTimeField


class User(Document):
    name = StringField(max_length=10)
    phone = StringField(required=True, max_length=11)
    role = StringField(required=True)
    project = StringField(required=True)
    total_beans = IntField(default=0)

    province = StringField()
    city = StringField()
    longitude = DecimalField()
    latitude = DecimalField()

    title = StringField()
    office = StringField()
    hospital_name = StringField()

    create_time = DateTimeField(default=datetime.datetime.now())

    meta = {
        'indexs': ['phone'],
        'collection': 'test_users_copy'
    }

