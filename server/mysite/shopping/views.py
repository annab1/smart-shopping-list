from django.http import JsonResponse, HttpResponse
from datetime import datetime

# Create your views here.
from shopping.models import Category, Product, ShoppingList
from shopping.serializers import CategorySerializer, ProductSerializer
from django.contrib.auth.models import User


def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)


def create_list(request):
    name = request.POST['name']
    user = User.objects.get(id=int(request.user.id))
    ShoppingList.objects.create(name=name, user=user, date=datetime.now())

    return HttpResponse('')


def update_list(request):
    list = ShoppingList.objects.get(id=request.POST['id'])
    list.name = request.POST['name']
    list.save()

    return HttpResponse('')