from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<phone>(1[3578]\d{9}))/$', views.index),
    url(r'^(?P<phone>(1[3578]\d{9}))/info/$', views.info),
    url(r'^(?P<phone>(1[3578]\d{9}))/characters/$', views.characters),
    url(r'^(?P<phone>(1[3578]\d{9}))/projects/$', views.projects),
    url(r'^(?P<phone>(1[3578]\d{9}))/year_character/(?P<year>\d{4})/$', views.user_year_character),
    url(r'^(?P<phone>(1[3578]\d{9}))/month_character/(?P<year>\d{4})/$', views.user_month_character)
]
