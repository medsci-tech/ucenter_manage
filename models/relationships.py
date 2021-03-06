import datetime
from mongoengine import Document
from mongoengine import IntField
from mongoengine import StringField
from mongoengine import DateTimeField


class Relationship(Document):
    upstream_phone = StringField(required=True, max_length=11)
    upstream_role = StringField()

    downstream_phone = StringField(required=True, max_length=11)
    downstream_role = StringField()

    project_name_en = StringField()
    create_time = DateTimeField(default=datetime.datetime.now())

    meta = {
        'indexs': ['upstream_phone', 'downstream_phone'],
        'collection': 'relationships'
    }
