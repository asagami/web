from django.contrib import admin

# Register your models here.
from .models import user
from  .models import Order_form
admin.site.register(user)
admin.site.register(Order_form)
