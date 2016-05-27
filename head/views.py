from django.shortcuts import render

# Create your views here.
def home (request):
    return render(request,'Off Canvas Template for Bootstrap.html')
def login (request):
    return render(request,'login.html')
def detail (request):
    return render(request,"headline.html")