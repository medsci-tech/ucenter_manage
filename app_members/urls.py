from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^list/', views.list, name='member_list'),
    url(r'^export/', views.user_export, name='member_export'),
]
