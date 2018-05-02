# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-04-30 07:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0003_userdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='productinstances',
            name='is_checked',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='shoppinglist',
            name='is_archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='productinstances',
            name='shopping_list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='shopping.ShoppingList'),
        ),
    ]
