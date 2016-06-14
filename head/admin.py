from django.contrib import admin

# Register your models here.
from .models import ADMIN
from .models import ORDER
from .models import WORK_FORM
from .models import QC_FORM
from  .models import GOODS
admin.site.register(ADMIN)
admin.site.register(ORDER)
admin.site.register(WORK_FORM)
admin.site.register(QC_FORM)
admin.site.register(GOODS)