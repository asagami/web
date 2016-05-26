from django.db import models

# Create your models here.
class user(models.Model):
    UserID= models.IntegerField()
    UserPasswd =models.CharField(max_length=200)
    UserName=models.CharField(max_length=10)
    UserRemark=models.CharField(max_length=200)
    def __str__(self):
        return self.UserName

class Order_form(models.Model):
    UserID=models.ForeignKey(user)
    Order_image=models.ImageField()
    Order_ID=models.IntegerField()
    Worker_ID=models.IntegerField()



