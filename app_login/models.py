import datetime
from django.db import models


# Create your models here.
class Manager(models.Model):
    name = models.CharField(max_length=11)
    phone = models.CharField(max_length=11)
    code = models.CharField(max_length=6)
    update_time = models.DateTimeField(default=datetime.datetime.now())

