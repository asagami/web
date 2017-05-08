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
from head import views
urlpatterns = [
    url(r'^detail/',views.detail),
    url(r'^login/next=(.*)$',views.login),
    url(r'^$',views.home),
    url(r'^admin/', admin.site.urls),
    url(r'^log/(.*)/$',views.log),
    url(r'^logout', views.log_out),
    url(r'^sign/',views.sign),
    url(r'signup/',views.sign_up),
    url(r'^order/',views.order),
    url(r'^order_yes',views.order_yes),
    url(r'^order_no', views.order_no),
    url(r'^order_delete',views.order_delete),
    url(r'^order_change',views.order_change),
    url(r'^Diomand',views.DIMMAND),
    url(r'^sale/(.*)$',views.sale),
    url(r'^shopping/(.*)$',views.shopping),
    url(r'^buy/(.*)$',views.buy),
]
