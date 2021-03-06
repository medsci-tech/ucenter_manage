from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index),
    url(r'^all_user/$', views.home_all_user),
    url(r'^year_user/(?P<year>\d{4})/$', views.home_year_user),
    url(r'^month_user/(?P<year>\d{4})/$', views.home_month_user),
    url(r'^day_user/(?P<year>\d{4})/(?P<month>[1-9]|1[0-2])/$', views.home_day_user),
    url(r'^all_bean/$', views.home_all_bean),
    url(r'^year_bean/(?P<year>\d{4})/$', views.home_year_bean),
    url(r'^month_bean/(?P<year>\d{4})/$', views.home_month_bean),
    url(r'^day_bean/(?P<year>\d{4})/(?P<month>[1-9]|1[0-2])/$', views.home_day_bean)
]




