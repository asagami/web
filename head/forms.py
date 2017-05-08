from django import forms
class Order(forms.Form):
    OrderID=forms.IntegerField(label='OrderID')
    OrderName=forms.CharField(label='OrderName',max_length=10)