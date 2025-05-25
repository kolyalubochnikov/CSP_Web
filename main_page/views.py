from rest_framework import generics
from rest_framework import viewsets, permissions, status
from .models import Product, Order, AboutUs, Stack, Developer, OurProject
from .serializers import (
    ProductSerializer,
    OrderSerializer,
    AboutUsSerializer,
    StackSerializer,
    DeveloperSerializer,
    OurProjectSerializer
)


class ProductList(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderCreate(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class AboutUsDetail(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

    def get_object(self):
        return AboutUs.objects.first()


class StackList(viewsets.ModelViewSet):
    queryset = Stack.objects.all()
    serializer_class = StackSerializer


class DeveloperList(viewsets.ModelViewSet):
    queryset = Developer.objects.all()
    serializer_class = DeveloperSerializer


class OurProjectList(viewsets.ModelViewSet):
    queryset = OurProject.objects.all()
    serializer_class = OurProjectSerializer
