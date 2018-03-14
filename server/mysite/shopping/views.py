from django.http import JsonResponse, HttpResponse
from datetime import datetime
import time
# Create your views here.
from shopping.models import Category, Product, ShoppingList, ProductInstances
from shopping.serializers import CategorySerializer, ProductSerializer, \
    ProductInstancesSerializer, ShoppingListSerializer
from django.contrib.auth.models import User


def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_products(request):
    prefix_filter = request.GET["prefix"]
    products = Product.objects.all().filter(name__icontains=prefix_filter)
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)


def add_product(request):
    list_id = request.POST["list_id"]
    product_id = request.POST["product_id"]
    quantity = int(request.POST["quantity"])
    list_instance = ShoppingList.objects.get(id=list_id)
    product_instance = Product.objects.get(id=product_id)
    instances = ProductInstances.objects.all().filter(
        shopping_list=list_instance, product=product_instance)
    # TODO: get_or_create
    if len(instances) == 0:
        ProductInstances.objects.create(shopping_list=list_instance,
                                        product=product_instance,
                                        amount=quantity)
    else:
        instances[0].amount += quantity
        instances[0].save()
    return HttpResponse('')


def create_list(request):
    name = request.POST['name']
    user = User.objects.get(id=int(request.user.id))
    ShoppingList.objects.create(name=name, user=user, date=datetime.now())
    return HttpResponse('')


# The following code adds some products to the list for test purposes. IT SHOULD BE DELETED
def add_some_prodcuts_to_list(id):
    list_id = id
    product_id = 2
    quantity = 2
    list_instance = ShoppingList.objects.get(id=list_id)
    product_instance = Product.objects.get(id=product_id)
    instances = ProductInstances.objects.all().filter(
        shopping_list=list_instance, product=product_instance)
    if len(instances) == 0:
        ProductInstances.objects.create(shopping_list=list_instance,
                                        product=product_instance,
                                        amount=quantity)
    else:
        instances[0].amount += quantity
        instances[0].save()


def generate_list(request):
    name = time.strftime("%d_%m_%Y")
    user = User.objects.get(id=1)
    created_list = ShoppingList.objects.create(name=name, user=user,
                                               date=datetime.now())
    add_some_prodcuts_to_list(created_list.id)
    serializer = ShoppingListSerializer(created_list)
    return JsonResponse(serializer.data, safe=False)


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
    product_instance = Product.objects.get(id=product_id)
    instance = \
    ProductInstances.objects.all().filter(shopping_list=list_instance,
                                          product=product_instance)[0]
    if instance.amount <= quantity:
        instance.amount = 0
    else:
        instance.amount -= quantity
    instance.save()
    return HttpResponse('')


def get_shopping_list(request):
    list_id = request.GET["list_id"]
    list_instance = ShoppingList.objects.get(id=list_id)
    serializer = ShoppingListSerializer(list_instance)
    return JsonResponse(serializer.data, safe=False)


def get_shopping_lists(request):
    list_instances = ShoppingList.objects.all()
    serializer = ShoppingListSerializer(list_instances, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_product_by_id(request):
    prod_id = request.GET["id"]
    product = Product.objects.all().filter(id=prod_id)[0]
    serializer = ProductSerializer(product)
    return JsonResponse(serializer.data, safe=False)
