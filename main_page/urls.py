from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

app_name = 'main_page'
router = DefaultRouter()
router.register(r'product', ProductList, basename='product')
router.register(r'order', OrderCreate, basename='order')
router.register(r'about_us', AboutUsDetail, basename='about_us')
router.register(r'stack_list', StackList, basename='stack_list')
router.register(r'developer_list', DeveloperList, basename='developer_list')
router.register(r'our_project_list', OurProjectList, basename='our_project_list' )

urlpatterns = [
    path('', include(router.urls))
]