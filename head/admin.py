from django.contrib import admin

# Register your models here.
from .models import userform
from .models import Order
from .models import WORK_FORM
admin.site.register(userform)
admin.site.register(Order)
admin.site.register(WORK_FORM)