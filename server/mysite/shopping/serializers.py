from rest_framework import serializers

from shopping.models import Category, Product, ProductInstances, ShoppingList, \
    UserData
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "category")

    category = CategorySerializer()


class ProductInstancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInstances
        fields = ("product", "amount", "is_checked")

    product = ProductSerializer()


class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        fields = ("id", "name", "is_archived", "date", "products")

    products = ProductInstancesSerializer(many=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'

    user = UserSerializer()
