"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
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
from django.contrib import admin
from head import views as head_view
urlpatterns = [
    url(r'make/',head_view.detail),
    url(r'test/',head_view.get_name),
    url(r'^detail/',head_view.detail),
    url(r'^login/',head_view.login),
    url(r'^$',head_view.home),
    url(r'^admin/', admin.site.urls),
    url(r'^search-form/$', head_view.search_form),
	url(r'^search/$', head_view.search),
    url(r'^log/',head_view.log)
]
