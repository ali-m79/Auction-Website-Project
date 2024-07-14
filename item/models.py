from django.db import models
from bidwin.models import User
from bidwin.models import UserProfile
from django.utils import timezone
from django.contrib.auth.models import User

class Item(models.Model):
    title = models.CharField(max_length=500)
    price = models.FloatField(default=0.0)
    description = models.CharField(max_length=3000)
    owner = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='items')
    release_date = models.DateTimeField()
    created_date = models.DateTimeField()
    expiration_date = models.DateTimeField(default=timezone.now)
    ram = models.CharField(max_length=5 ,default="0")
    storage = models.CharField(max_length=5 , default="0")
    core_number = models.CharField(max_length=2 , default=None)
    brand = models.CharField(max_length=100 , default=None)
    link = models.CharField(max_length=100 , null=True)
    group = models.CharField(max_length=100 , null=True)

class Phone(Item):
    sim_number = models.IntegerField()
    camera = models.IntegerField()
    os = models.CharField(max_length=100 ,default=None)

class Console(Item):
    generation = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    controler_number = models.CharField(max_length=2,default="0")

class Laptop(Item):
    cpu = models.CharField(max_length=100 , default= None)
    gpu = models.CharField(max_length=100 , default=None)
    os = models.CharField(max_length=100 , default=None)



class Comment(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    message = models.CharField(max_length=50000)
    owner_id = models.OneToOneField(User, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

class Participate(models.Model) :
   item = models.ForeignKey(Item, on_delete=models.CASCADE)
   owner = models.ManyToManyField(User, related_name='participent_items', blank=True)
   suggested_price = models.FloatField(default=0.0)
   date_time = models.DateTimeField()

class Winner_item(models.Model) :
    item = models.OneToOneField(Item, on_delete=models.CASCADE, related_name='winner')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='won_items')
    win_date = models.DateTimeField(default=timezone.now)

class ItemImage(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='item_images/item/')


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=6000)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

class Interested(models.Model):
    item = models.OneToOneField(Item , on_delete=models.CASCADE,related_name='user')
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='interested_items')



