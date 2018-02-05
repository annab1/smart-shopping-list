from django.http import JsonResponse, HttpResponse
from datetime import datetime

# Create your views here.
from shopping.models import Category, Product, ShoppingList, ProductInstances
from shopping.serializers import CategorySerializer, ProductSerializer, ProductInstancesSerializer
from django.contrib.auth.models import User


def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

def add_product(request):
    list_id = request.POST["list_id"]
    product_id = request.POST["product_id"]
    quantity = int(request.POST["quantity"])
    list_instance = ShoppingList.objects.get(id=list_id)
    product_instance = Product.objects.get(id = product_id)
    instances = ProductInstances.objects.all().filter(shopping_list=list_instance, product=product_instance)
    #TODO: get_or_create
    if len(instances) == 0:
        ProductInstances.objects.create(shopping_list=list_instance, product=product_instance, amount=quantity)
    else:
        instances[0].amount += quantity
        instances[0].save()
    return HttpResponse('')


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


def remove_product(request):
    list_id = request.POST["list_id"]
    product_id = request.POST["product_id"]
    quantity = int(request.POST["quantity"])
    list_instance = ShoppingList.objects.get(id=list_id)
    product_instance = Product.objects.get(id = product_id)
    instance = ProductInstances.objects.all().filter(shopping_list=list_instance, product=product_instance)[0]
    if instance.amount <= quantity:
        instance.amount = 0
    else:
        instance.amount -= quantity
    instance.save()
    return HttpResponse('')


def get_products_in_list(request):
    list_id = request.GET["list_id"]
    list_instance = ShoppingList.objects.get(id=list_id)
    instances = ProductInstances.objects.all().filter(shopping_list=list_instance)
    serializer = ProductInstancesSerializer(instances, many=True)
    return JsonResponse(serializer.data, safe=False)