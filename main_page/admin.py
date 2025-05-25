from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

admin.site.register(Product)
admin.site.register(AboutUs)
admin.site.register(Stack)
admin.site.register(Developer)
admin.site.register(OurProject)
admin.site.register(Order)


