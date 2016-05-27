from django.db import models

# Create your models here.
class userform(models.Model):
    UserID= models.IntegerField(default=0, primary_key=True)
    UserPasswd =models.CharField(max_length=200)
    UserName=models.CharField(max_length=10)
    UserRemark=models.CharField(max_length=200)
    def __str__(self):
        return self.UserName

class Order(models.Model):
    UserID=models.ForeignKey(userform)
    DATE_R=models.DateField(auto_now_add=False,null=True)
    DATE_D=models.DateField(auto_now_add=False,null=True)
    DES=models.CharField(max_length=200,null=True)
    OrderID=models.IntegerField(default=0 ,primary_key=True)
    WorkerID=models.IntegerField(default=0)
    def __str__(self):
        return self.DES


class WORK_FORM(models.Model):
    WorkerID=models.ForeignKey(Order)
    WorkName=models.CharField(max_length=10,null=True)
    DATE_R=models.DateField(auto_created=True,null=True)











