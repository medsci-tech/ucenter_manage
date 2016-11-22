from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_code/(?P<phone>((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/$',
        views.get_code),
    url(r'^check_code/(?P<phone>[0-9]+)/(?P<code>[0-9]+)$', views.check_code)
]
