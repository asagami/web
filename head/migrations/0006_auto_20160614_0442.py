# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('head', '0005_auto_20160612_0617'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='DATE_D',
            new_name='DATE',
        ),
        migrations.AlterField(
            model_name='admin',
            name='AdminEmail',
            field=models.EmailField(max_length=75),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='order',
            name='OrderID',
            field=models.IntegerField(serialize=False, primary_key=True),
            preserve_default=True,
        ),
    ]
