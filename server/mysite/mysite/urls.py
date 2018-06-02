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
from django.conf.urls import url, include
from django.contrib import admin
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView,
                                            )
from shopping.views import (get_categories, get_products, create_list,
                            add_product, remove_product,
                            update_list, get_shopping_list, get_shopping_lists,
                            get_product_by_id, generate_list,
                            update_product_is_checked_val,
                            update_list_is_archived_val,
                            permission_denied, create_user, get_user_details)

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
    url(r'^get/userdata/', get_user_details),
    url(r'^list/add/', add_product),
    url(r'^list/remove/', remove_product),
    url(r'^list/create/', create_list),
    url(r'^list/generate/', generate_list),
    url(r'^list/update/', update_list),
    url(r'^list/get/', get_shopping_list),
    url(r'^list/getall/', get_shopping_lists),
    url(r'^list/product/check', update_product_is_checked_val),
    url(r'^list/archive', update_list_is_archived_val),
    url(r'user/create', create_user),
    url(r'^denied', permission_denied),

    # Api for Auth
    url(r'^$', generic.RedirectView.as_view(
        url='/api/', permanent=False)),
    url(r'^api/$', get_schema_view()),
    url(r'^api/auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view())

]
