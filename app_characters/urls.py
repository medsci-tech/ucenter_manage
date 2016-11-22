from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$', views.index),
    url(r'^characters/(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$', views.characters),
    url(r'^projects/(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$', views.projects),
    url(r'^year_character/(?P<year>\d{4})/(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$',
        views.user_year_character),
    url(r'^month_character/(?P<year>\d{4})/(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$',
        views.user_month_character)
]
