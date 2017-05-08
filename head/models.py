from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import User


# Create your models here.


class ADMIN(models.Model):
    AdminID = models.IntegerField(null=False, primary_key=True)
    AdminEmail = models.EmailField(null=False)
    AdminPasswd = models.CharField(max_length=200)
    AdminName = models.CharField(max_length=10)


def __str__(self):
    return self.AdminName


class GOODS(models.Model):
    GoodID = models.IntegerField(null=False, primary_key=True)
    GoodName = models.CharField(null=False, max_length=20, default='  ')
    GoodPrice = models.IntegerField(null=False)
    GoodDetail = models.TextField(null=False)
    GoodColor = models.CharField(null=False, max_length=10, default='green')
    GoodWeight = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.GoodName


class ORDER(models.Model):
    UserID = models.ForeignKey(User)
    OrderName = models.CharField(max_length=10, null=True)
    OrderID = models.IntegerField(null=False, primary_key=True)
    ADDRESS = models.CharField(null=False, max_length=100, default=0)
    DATE = models.DateField(auto_now_add=False, null=True)
    DES = models.TextField(null=True)
    Price = models.IntegerField(null=False)
    Telephone = models.IntegerField(null=False)
    Status = models.BooleanField(null=False)

    def __str__(self):
        return self.ADDRESS


class WORK_FORM(models.Model):
    Work_FormID = models.IntegerField(null=False, primary_key=True)
    OrderID = models.ForeignKey(ORDER)
    Work_FormName = models.CharField(max_length=20)
    WorkerID = models.IntegerField(null=False)
    Date = models.DateField(null=True)
    DES = models.TextField(max_length=200)
    Status = models.BooleanField(null=False)

    def __str__(self):
        return self.Work_FormName


class QC_FORM(models.Model):
    Work_FormID = models.ForeignKey(WORK_FORM)
    WorkerID = models.IntegerField(null=False)
    QC_ID = models.IntegerField(null=False)
    Quality = models.BooleanField(null=False)

    def __int__(self):
        return self.Work_FormID
