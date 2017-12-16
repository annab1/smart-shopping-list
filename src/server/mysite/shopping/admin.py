from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from models import Product, ProductInstances, ShoppingList, Category, UserData


class UserData(admin.StackedInline):
    model = UserData
    can_delete = False
    verbose_name_plural = 'user_data'


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserData,)


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Product)
admin.site.register(ProductInstances)
admin.site.register(ShoppingList)
admin.site.register(Category)
