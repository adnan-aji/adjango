from django.contrib import admin
# Register your models here.
from accounts.models import UserProfile,Student_profile

admin.site.register(UserProfile)
admin.site.register(Student_profile)
