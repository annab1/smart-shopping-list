import json
import datetime
import time
from shopping.models import Category, Product, ShoppingList, ProductInstances
from shopping.serializers import CategorySerializer, ProductSerializer, \
    ProductInstancesSerializer, ShoppingListSerializer
from shopping.predictions import predict_single_product
import pandas as pd

from models import UserData, ProductInstances, ShoppingList
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


@csrf_exempt
@csrf_exempt
@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def get_products(request):
    prefix_filter = request.GET["prefix"]
    products = Product.objects.all().filter(name__icontains=prefix_filter)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def add_product(request):
    params = json.loads(request.body)

    list_id = params["list_id"]
    product_id = params["product_id"]
    quantity = int(params["quantity"])
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
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def create_list(request):
    params = json.loads(request.body)
    name = params['name']
    ShoppingList.objects.create(name=name, user=request.user,
                                date=datetime.now())
    return Response(status=status.HTTP_200_OK)


# The following code adds some products to the list for test purposes. IT SHOULD BE DELETED
@csrf_exempt
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


@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def generate_list(request):
    name = time.strftime("%d_%m_%Y")
    list_instance = ShoppingList.objects.create(name=name, user=request.user,
                                                date=pd.datetime.now())
    products = Product.objects.all()
    for product in products:
        amount = round(predict_single_product(request.user.id, product.id))
        if amount:
            ProductInstances.objects.create(shopping_list=list_instance,
                                            product=product, amount=amount)
    serializer = ShoppingListSerializer(list_instance)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def update_list(request):
    params = json.loads(request.body)
    shopping_list = ShoppingList.objects.get(id=params['id'])
    shopping_list.name = params['name']
    shopping_list.save()

    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def remove_product(request):
    params = json.loads(request.body)
    list_id = params["list_id"]
    product_id = params["product_id"]
    instance = \
        ProductInstances.objects.filter(shopping_list_id=list_id,
                                        product_id=product_id).delete()
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def get_shopping_list(request):
    list_id = request.GET["list_id"]
    list_instance = ShoppingList.objects.get(id=list_id)
    serializer = ShoppingListSerializer(list_instance)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def get_shopping_lists(request):
    list_instances = ShoppingList.objects.filter(user=request.user)
    serializer = ShoppingListSerializer(list_instances, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
@login_required(login_url="/denied/")
def get_product_by_id(request):
    prod_id = request.GET["id"]
    product = Product.objects.all().filter(id=prod_id)[0]
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def update_product_is_checked_val(request):
    params = json.loads(request.body)
    product_id = params["product_id"]
    list_id = params["list_id"]
    is_checked = params["value"]
    product_instance = ProductInstances.objects.get(product_id=product_id,
                                                    shopping_list_id=list_id)
    if not product_instance:
        pass
    else:
        product_instance.is_checked = is_checked
        product_instance.save()
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@login_required(login_url="/denied/")
def update_list_is_archived_val(request):
    params = json.loads(request.body)
    list_id = params["list_id"]
    is_checked = params["value"]
    list_instance = ShoppingList.objects.get(id=list_id)
    if not list_instance:
        pass
    else:
        list_instance.is_archived = is_checked.lower() == 'true'
        list_instance.save()
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
def create_user(request):
    params = json.loads(request.body)
    username = params["username"]
    first_name = params["first_name"]
    last_name = params["last_name"]
    password = params["password"]
    email = params["email"]
    birth_date = params["birth_date"]
    gender = params["gender"]
    relationship = params["relationship"]

    parsed_date = datetime.datetime.strptime(birth_date, "%Y-%M-%d")
    user = User.objects.create_user(username=username, first_name=first_name,
                                    last_name=last_name, password=password,
                                    email=email)
    user_data = UserData(user=user, gender=gender, relationship=relationship,
                         birth_date=parsed_date)
    user_data.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def permission_denied(request):
    return Response(status=status.HTTP_401_UNAUTHORIZED)
