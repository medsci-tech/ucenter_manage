from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^year_user/(?P<year>\d{4})/$', views.users_year_user),
    url(r'^month_user/(?P<year>\d{4})/$', views.users_month_user),
    url(r'^day_user/(?P<year>\d{4})/(?P<month>[1-9]|1[0-2])/$', views.users_day_user),
    url(r'^year_bean/(?P<year>\d{4})/$', views.users_year_bean),
    url(r'^month_bean/(?P<year>\d{4})/$', views.users_month_bean),
    url(r'^day_bean/(?P<year>\d{4})/(?P<month>[1-9]|1[0-2])/$', views.users_day_bean)
]
