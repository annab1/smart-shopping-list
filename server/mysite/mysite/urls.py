"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url
from django.contrib import admin

from shopping.views import (get_categories, get_products, create_list,add_product, remove_product,
                            update_list, get_products_in_list, get_product_by_id)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^get/categories/', get_categories),
    url(r'^get/products/', get_products),
]

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^get/categories/', get_categories),
    url(r'^get/products/', get_products),
    url(r'^get/product/', get_product_by_id),
    url(r'^list/add/', add_product),
    url(r'^list/remove/', remove_product),
    url(r'^list/create/', create_list),
    url(r'^list/update/', update_list),
    url(r'^list/get/', get_products_in_list)
]
