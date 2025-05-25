from rest_framework import serializers
from .models import Product, Order, AboutUs, Stack, Developer, OurProject


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Product.objects.all()
    )

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {
            'terms_of_reference': {'required': True}
        }


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = '__all__'


class DeveloperSerializer(serializers.ModelSerializer):
    stacks = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Stack.objects.all()
    )

    class Meta:
        model = Developer
        fields = '__all__'


class OurProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurProject
        fields = '__all__'