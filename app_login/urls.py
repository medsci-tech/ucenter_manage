from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_code/(?P<phone>(1[3578]\d{9}))/$', views.get_code),
    url(r'^logout/(?P<phone>(1[3578]\d{9}))/$', views.logout),
    url(r'^check_code/(?P<phone>[0-9]+)/(?P<code>[A-Za-z0-9]{6})$', views.check_code)
]
