import datetime
from mongoengine import Document
from mongoengine import StringField
from mongoengine import DateTimeField


# Create your models here.
class Manager(Document):
    meta = {
        'indexs': ['phone'],
        'collection': 'admins'
    }

    name = StringField()
    phone = StringField(required=True)
    code = StringField()
    update_time = DateTimeField(default=datetime.datetime.now())

