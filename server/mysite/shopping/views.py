from django.http import JsonResponse

# Create your views here.
from shopping.models import Category, Product
from shopping.serializers import CategorySerializer, ProductSerializer


def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)
