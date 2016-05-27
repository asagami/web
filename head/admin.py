from django.contrib import admin

# Register your models here.
from .models import USER
from .models import ORDER
from .models import WORK_FORM
admin.site.register(USER)
admin.site.register(ORDER)
admin.site.register(WORK_FORM)