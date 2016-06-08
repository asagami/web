from django.shortcuts import render
from django.http import  HttpResponseRedirect
from django.http import  HttpResponse
from django.shortcuts import  render_to_response
from head.models import USER
from django.template import RequestContext


# Create your views here.
def home (request):
    return render(request,'loginmainpage.html')

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
                request.session['login_in']=userid
                message=userid
        except USER.DoesNotExist:
            return HttpResponse("登录失败，请重新登录")
    return render_to_response(request,'loginmainpage.html',{'message':message},)


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

def log_out(request):
    try:
        del request.session['login_in']
    except KeyError:
        pass
    return render(request,'loginmainpage.html')

def order(request):
    return render(request,'order.html')
