from django.shortcuts import render
from django.http import  HttpResponseRedirect
from django.http import  HttpResponse
from django.shortcuts import  render_to_response
from .forms import NAME
from head.models import USER
# Create your views here.
def home (request):
    return render(request,'mainpage.html')

def detail(request):
    return render(request,'headline.html')

def login (request):
    return render(request,'login.html')

def log (request):
    if request.POST:
        userid=request.POST['userID']
        passwd=request.POST['passwd']
        try:
            if USER.objects.get(UserEmail=userid) and USER.objects.filter(UserPasswd=passwd):
                message=str(userid)
        except USER.DoesNotExist:
            return HttpResponse("登录失败，请重新登录")
    return render(request,'mainpage.html',{'message':message})

def sign (request):
    if request.POST:
        userid=request.POST['userID']
        passwd=request.POST['passwd']
        name=request.POST['name']
        remark=request.POST['remark']
        user=USER(UserEmail=userid,UserPasswd=passwd,UserName=name, UserRemark=remark)
        user.save()
    return HttpResponse("注册成功")

def sign_up(request):
    return render(request,'sign up.html')
