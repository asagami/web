from django.shortcuts import render

# Create your views here.
def home (request):
    string="ruanyiyang"
    return render(request,'headline.html',{'string':string})
def login (request):
    return render(request,'login.html')