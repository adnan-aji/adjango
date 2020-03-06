from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save


# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=100, default="No details")
    city = models.CharField(max_length=30, default="")
    website = models.URLField(default="_blank")
    phone = models.IntegerField(default=0)


def create_profile(sender, **kwargs):
    if (kwargs['created']):
        user_profile = UserProfile.objects.create(user=kwargs['instance'])


class Student_profile(models.Model):
    std_id = models.IntegerField(primary_key='true')
    name = models.CharField(max_length=100, null=False)
    Gender = models.CharField(max_length=10)
    Salary = models.IntegerField(null=False)

# to solve issues

# https://south.readthedocs.io/en/latest/databaseapi.html#database-specific-issues
