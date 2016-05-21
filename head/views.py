from django.shortcuts import render

# Create your views here.
def home (request):
    string="ruanyiyang"
    return render(request,'headline.html',{'string':string})