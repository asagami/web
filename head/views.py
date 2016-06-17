from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib import auth
from django.contrib.auth.models import User
from .models import ORDER
from .models import GOODS
import datetime


# Create your views here.
def home(request):
    return render(request, 'mainpage.html')


def detail(request):
    return render(request, 'detail.html')


def login(request):
    url=request.get_full_path()
    print(url)
    return render_to_response( 'login.html',{'url':url})


def log(request):
    if request.POST:
        userid = request.POST['userID']
        passwd = request.POST['passwd']
        url=request.POST['text']
        user = auth.authenticate(username=userid, password=passwd)
        if user is not None and user.is_active:
            auth.login(request, user)
            message = userid
            return  HttpResponseRedirect(url)
        else:
            return HttpResponseRedirect("/login")


def sign_up(request):
    return render(request, 'sign up.html')


def sign(request):
    if request.POST:
        userid = request.POST['userID']
        passwd = request.POST['passwd']
        passwd_re = request.POST['passwd_re']
        name = request.POST['name']
        try:
            if passwd == passwd_re:
                user = User.objects.create_user(name, userid, passwd)
                user.save()
            else:
                message = u'两次密码不同'
                return render(request, 'sign up.html', {'message': message})
        except:
            message = u'注册失败,请重新注册'
            return render(request, 'sign up.html', {'message': message})
    return HttpResponseRedirect('/')


def log_out(request):
    auth.logout(request)
    return HttpResponseRedirect('/')


def order(request):
    if request.user.is_superuser:
        data = ORDER.objects.all()
        return render(request, 'order_view.html', {'data': data})
    else:
        return HttpResponse('无法访问')


def order_yes(request):
    data = ORDER.objects.filter(Status=True)
    return render(request, 'order_view.html', {'data': data})


def order_no(request):
    data = ORDER.objects.exclude(Status=True)
    return render(request, 'order_view.html', {'data': data})


def order_delete(request):
    if request.POST:
        check_box_list = request.POST.getlist('order')
        for i in check_box_list:
            ORDER.objects.filter(OrderID=int(i)).delete()
    return HttpResponseRedirect('/order')


def order_change(request):
    if request.POST:
        check_box_list = request.POST.getlist('order')
        for i in check_box_list:
            ORDER.objects.filter(OrderID=int(i)).update(Status=True)
    return HttpResponseRedirect('/order')


def DIMMAND(request):
    return render(request, 'buy.html')


def sale(request):
    data_G = GOODS.objects.filter(GoodName='砖石')
    return render(request, 'goods.html', {'data': data_G})


def shopping(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/login')
    elif request.user.is_authenticated():
        data_G = GOODS.objects.filter(GoodName='砖石')
        return render(request, 'shopping.html', {'data': data_G})


def buy(request):
    if request.POST:
        data = GOODS.objects.get(GoodName='砖石')
        i = len(GOODS.objects.all())
        order = ORDER()
        order.UserID = request.user.get_username()
        order.DATE = datetime.date.today()
        order.Price = data.GoodPrice
        order.ADDRESS = request.POST['address']
        order.OrderID = 22222 * 1000 + i + 1
        order.Telephone = request.POST['telephone']
        order.Status =False
        order.save()
    return HttpResponse('购买成功')
