from django.shortcuts import render
from django.http import  HttpResponseRedirect
from django.http import  HttpResponse
from django.shortcuts import  render_to_response
from .forms import NAME
from head.models import USER
# Create your views here.
def home (request):
    return render(request,'Off Canvas Template for Bootstrap.html')
def login (request):
    return render(request,'login.html')
def detail (request):
    return render(request,"headline.html")
def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = NAME(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form =NAME()
    return render(request, 'test.html', {'form': form})

def make(request):
    message=request.POST['your_name']
    return render(request,'test.html',{'message':message})

def search_form(request):
    return render_to_response('test.html')

# 接收请求数据
def search(request):
    request.encoding='utf-8'
    if 'q' in request.GET:
        message = request.GET['q'].encode('utf-8')
    else:
        message = '你提交了空表单'
    return HttpResponse(message)
def log (request):
    if request.POST:
        if request.POST['userID']
    return HttpResponse(message)