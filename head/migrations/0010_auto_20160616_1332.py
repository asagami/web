# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-16 05:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('head', '0009_order_telephone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='UserID',
            field=models.CharField(default=0, max_length=20),
        ),
    ]