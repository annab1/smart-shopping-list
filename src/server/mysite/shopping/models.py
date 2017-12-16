from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200)


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class ShoppingList(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField('date')
    user = models.ForeignKey(User)


class ProductInstances(models.Model):
    shopping_list = models.ForeignKey(ShoppingList)
    product = models.ForeignKey(Product)
    amount = models.IntegerField()
