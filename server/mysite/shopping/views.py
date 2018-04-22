import pytz
from django.http import JsonResponse, HttpResponse
import pandas as pd
import datetime
import time
# Create your views here.
from shopping.models import Category, Product, ShoppingList, ProductInstances
from shopping.serializers import CategorySerializer, ProductSerializer, ProductInstancesSerializer, ShoppingListSerializer
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
        sample_time = (single_list.date - datetime.datetime(1970, 1, 1, tzinfo=pytz.UTC)).total_seconds()
        #content.append((sample_time, product_for_date[0].amount) if product_for_date else (sample_time, 0))
        content.append(float(product_for_date[0].amount) if product_for_date else float(0))
    return content
    # URLS - https://stackoverflow.com/questions/11697887/converting-django-queryset-to-pandas-dataframe
    #  https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python


def parser(a):
    return pd.datetime.strptime('2005-05', '%Y-%m')


def predict_single_product(user_id, product_id):
    fa = "c:\\rashti\\mysitelog"+str(user_id)+"_"+str(product_id)+ ".txt"
    f = open(fa, "wb")
    data = aggregate_data(user_id, product_id)
    #a = pd.DataFrame(data)
    #a.to_csv("c:\\rashti\\mysitecsv.csv")
    #data = pd.read_csv("c:\\rashti\\mysitecsv.csv", squeeze=False,index=0, parse_dates=[0], date_parser=parser).values
    f.write(str(data))
    f.write("\r\n")
    #TODO: Convert each number to int64 since there's a bug in ARIMA
    f.write("\r\nData is " + str(data))
    if len(set(data)) < 2: #0 or 1
        f.write("Returning due to singular matrix")
        f.flush()
        return data[0]
    model = ARIMA(data, order=(1, 0, 0))
    f.write("Arima created")
    f.flush()
    model_fit = model.fit(disp=0)
    f.write("\r\nModel was trained")
    output = model_fit.forecast()
    f.write("\r\nDone with forecast")
    f.write(str(output[0]))
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
    list_instance = ShoppingList.objects.create(name=name, user=user, date=pd.datetime.now())
    products = Product.objects.all()
    for product in products:
        amount = predict_single_product(request.user.id, product.id)
        ProductInstances.objects.create(shopping_list=list_instance, product=product, amount=amount)
    return HttpResponse('')


# The following code adds some products to the list for test purposes. IT SHOULD BE DELETED
def add_some_prodcuts_to_list(id):
    list_id = id
    product_id = 2
    quantity = 2
    list_instance = ShoppingList.objects.get(id=list_id)
    product_instance = Product.objects.get(id=product_id)
    instances = ProductInstances.objects.all().filter(shopping_list=list_instance, product=product_instance)
    if len(instances) == 0:
        ProductInstances.objects.create(shopping_list=list_instance, product=product_instance, amount=quantity)
    else:
        instances[0].amount += quantity
        instances[0].save()


def generate_list(request):
    name = request.POST['name']
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


def get_product_by_id(request):
    prod_id = request.GET["id"]
    product = Product.objects.all().filter(id=prod_id)[0]
    serializer = ProductSerializer(product)
    return JsonResponse(serializer.data, safe=False)