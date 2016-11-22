from django.db import models
from django.utils.timezone import now


# Create your models here.
class Manager(models.Model):
    name = models.CharField(max_length=11)
    phone = models.CharField(max_length=11)
    code = models.CharField(max_length=6)
    update_time = models.DateTimeField(default=now())
