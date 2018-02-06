from rest_framework import serializers

from shopping.models import Category, Product, ProductInstances, ShoppingList


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
        fields = ("product", "amount")

    product = ProductSerializer()


class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        fields = ("id", "name", "date", "products")

    products = ProductInstancesSerializer(many=True)
