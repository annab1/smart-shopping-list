from django.http import JsonResponse, HttpResponse
import pandas as pd
import datetime
import time
# Create your views here.
from shopping.models import Category, Product, ShoppingList, ProductInstances
from shopping.serializers import CategorySerializer, ProductSerializer, \
    ProductInstancesSerializer, ShoppingListSerializer
from django.contrib.auth.models import User
import pandas as pd

from statsmodels.tsa.arima_model import ARIMA
from models import UserData, ProductInstances, ShoppingList


def aggregate_data(user_id, product_id):
    '''
    Aggregates data for specific product given a user id, used for prediction
    :param user_id: Desired user id
    :param product_id: Product id to be examined
    :return: Dataframe containing the data sliced by timeframe
    '''
    user_lists = ShoppingList.objects.all().filter(user=user_id)
    users_products = ProductInstances.objects.all().filter(shopping_list__in=user_lists, product_id=product_id)
    content = []
    content.append
    for single_list in user_lists:
        product_for_date = [x for x in users_products if x.shopping_list.id == single_list.id]
        content.append(float(product_for_date[0].amount) if product_for_date else float(0))
    return content
    # URLS - https://stackoverflow.com/questions/11697887/converting-django-queryset-to-pandas-dataframe
    #  https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python


def predict_single_product(user_id, product_id):
    data = aggregate_data(user_id, product_id)
    if len(set(data)) < 2: #0 or 1
        return data[0]
    model = ARIMA(data, order=(1, 0, 0))
    model_fit = model.fit(disp=0)
    output = model_fit.forecast()
    return output[0][0]


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
    user = User.objects.get(id=int(request.user.id))
    list_instance = ShoppingList.objects.create(name=name, user=user, date=pd.datetime.now())
    products = Product.objects.all()
    for product in products:
        amount = predict_single_product(request.user.id, product.id)
        ProductInstances.objects.create(shopping_list=list_instance, product=product, amount=amount)
    serializer = ShoppingListSerializer(list_instance)
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


def update_product_is_checked_val(request):
    product_id = request.POST["product_id"]
    value = int(request.POST["value"])
    value_bool = True if 1 == value else False
    product_instance = ProductInstances.objects.get(id=product_id)
    if not product_instance:
        pass
    else:
        product_instance.is_checked = value_bool
        product_instance.save()
    return HttpResponse('')
