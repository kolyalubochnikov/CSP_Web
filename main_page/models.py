from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    about = models.TextField()
    price = models.FloatField()

    def __str__(self):
        return self.name


class AboutUs(models.Model):
    main_text = models.TextField()
    text = models.TextField()
    sub_text = models.TextField()

    def __str__(self):
        return f'{self.main_text} {self.text} {self.sub_text}'


class Stack(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name


class Developer(models.Model):
    name = models.CharField(max_length=100)
    skills = models.TextField()
    stacks = models.ManyToManyField(Stack)

    def __str__(self):
        return self.name


class OurProject(models.Model):
    main_text = models.CharField(max_length=100)
    about = models.CharField('About Us', max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    url = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.main_text


class Order(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    terms_of_reference = models.FileField(upload_to='files/')
    products = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return self.name
