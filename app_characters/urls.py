from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$', views.index),
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/info/$', views.info),
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/characters/$', views.characters),
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/projects/$', views.projects),
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/year_character/(?P<year>\d{4})/$',
        views.user_year_character),
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/month_character/(?P<year>\d{4})/$',
        views.user_month_character)
]
