import datetime
from mongoengine import Document
from mongoengine import StringField
from mongoengine import DateTimeField


class Manager(Document):
    name = StringField()
    phone = StringField(required=True)
    code = StringField()
    update_time = DateTimeField(default=datetime.datetime.now())

    meta = {
        'collection': 'test_manager'
    }

