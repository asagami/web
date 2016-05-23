from django.db import models

# Create your models here.
class user(models.Model):
    UserID= models.IntegerField()
    UserPasswd =models.CharField(max_length=200)
    UserName=models.CharField(max_length=10)
    UserRemark=models.CharField(max_length=200)


class Order_form(models.Model):
    UserID=models.ForeignKey(user)
    Order_image=models.ImageField()