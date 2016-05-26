# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('head', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Order_image', models.ImageField(upload_to=b'')),
                ('Worker_ID', models.IntegerField()),
                ('UserID', models.ForeignKey(to='head.user')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='order_form',
            name='UserID',
        ),
        migrations.DeleteModel(
            name='Order_form',
        ),
    ]
