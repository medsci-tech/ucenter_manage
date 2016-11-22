"""ucenter_statistic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin

urlpatterns = [
    url(r'^manage/', include('app_manage.urls')),
    url(r'^home/', include('app_home.urls')),
    url(r'^doctors/', include('app_doctors.urls')),
    url(r'^users/', include('app_users.urls')),
    url(r'^characters/', include('app_characters.urls')),
    url(r'^admin/', admin.site.urls),
]