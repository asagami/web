from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import  HttpResponseRedirect
from django.http import  HttpResponse
from django.shortcuts import  render_to_response
from django.template import RequestContext
from django.contrib import auth
from django.contrib.auth import  authenticate
from django.contrib.auth.models import User
from .models import ADMIN
from .models import ORDER
# Create your views here.
def home (request):
    return render(request,'mainpage.html')

def detail(request):
    return render(request,'detail.html')

def login (request):
    return render(request,'login.html')

def log (request):
    if request.POST:
        userid=request.POST['userID']
        passwd=request.POST['passwd']
        user=auth.authenticate(username=userid ,password=passwd)
        if user is not None and user.is_active:
            auth.login(request,user)
            message=userid
            return render_to_response( 'mainpage.html', {'message': message},context_instance=RequestContext(request))
        else:
            return HttpResponseRedirect("/login")


def sign (request):
    if request.POST:
        userid=request.POST['userID']
        passwd=request.POST['passwd']
        passwd_re=request.POST['passwd_re']
        name=request.POST['name']
        try:
            if passwd==passwd_re :
                user=User.objects.create_user(name,userid,passwd)
                user.save()
            else:
                message=u'两次密码不同'
                return render(request, 'sign up.html', {'message': message})
        except:
            message=u'注册失败,请重新注册'
            return render(request,'sign up.html',{'message':message})
    return HttpResponseRedirect('/')

def sign_up(request):
    return render(request,'sign up.html')

def log_out(request):
    auth.logout(request)
    return HttpResponseRedirect('/')

def order(request):
    data=ORDER.objects.all()
    return render(request,'order_view.html',{'data':data})

def DIMMAND(request):
    return  render(request, 'buy.html')

def sale(request):
    return render(request, 'diomand.html')

def user_view(request):
    data=ADMIN.objects.all()
    return render(request,'order.html',{'data':data})