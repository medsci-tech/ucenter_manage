import datetime
from mongoengine import Document
from mongoengine import IntField
from mongoengine import StringField
from mongoengine import DateTimeField


class Bean(Document):
    user_phone = StringField(required=True, max_length=11)
    user_role = StringField(required=True)

    rule_type_name_en = StringField(required=True)
    rule_name_en = StringField(required=True)

    company_name_en = StringField()
    app_name_en = StringField()
    project_name_en = StringField()

    posted_beans = IntField()
    saved_beans = IntField()

    create_time = DateTimeField(default=datetime.datetime.now())

    meta = {
        'indexs': ['user_phone'],
        'collection': 'test_user_beans_copy'
    }

