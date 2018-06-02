from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ShoppingList(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField('date')
    user = models.ForeignKey(User)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ProductInstances(models.Model):
    shopping_list = models.ForeignKey(ShoppingList, related_name="products")
    product = models.ForeignKey(Product)
    amount = models.IntegerField()
    is_checked = models.BooleanField(default=False)

    def __str__(self):
        return "Product: {}, Amount: {}, List: {}".format(self.product,
                                                          self.amount,
                                                          self.shopping_list)


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateTimeField('date of birth')
    gender = models.CharField(max_length=2, choices=(("M", "Male"),
                                                     ("F",
                                                      "Female")))
    relationship = models.CharField(max_length=2, choices=(("S", "Single"),
                                                           ("N",
                                                            "Not Single")))
