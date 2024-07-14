from django.db import models
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.contrib.auth.models import User




class Address(models.Model):
    state = models.CharField(max_length=300 ,null=True)
    city = models.CharField(max_length=300,null=True)
    address_detail = models.CharField(max_length=1000,null=True)
    plaque = models.CharField(max_length=5,null=True)
    floor = models.CharField(max_length=2,null=True)
    postal_code = models.CharField(max_length=10,null=True)
    land_line_phone = models.CharField(max_length=12,null=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=13, default='Non')
    national_code = models.CharField(max_length=10, default='Non')
    address = models.ForeignKey(Address , on_delete=models.SET_NULL , null=True,blank=True)
    address_available = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    dob= models.CharField(max_length=15,null=True)
    gender = models.CharField(max_length=15,null=True)
    image = models.ImageField(upload_to='item_images/user_profile/')
    rate = models.FloatField(default=0.0)


class Parameter(models.Model):
    # The specified key in the format (not including # at the beginning and end of it)
    Name = models.CharField(max_length=220)
    # The value of the specified key for replacement in SMS format (maximum 25 characters)
    Value = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.Name}: {self.Value}"


class ReturnedData(models.Model):
    # SMS unique identifier
    MessageId = models.IntegerField()
    # Send consumer credit
    Cost = models.DecimalField(max_digits=2, decimal_places=1)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='accounts')
    # shaba number
    bank_account_accepted = models.BooleanField(default=False)
    shaba_number = models.CharField(max_length=24,default=0)  
    bank_name = models.CharField(max_length=255, default= "") 

    # wallet amount
    inventory_money = models.BigIntegerField(default=0)
    withdrawn_money = models.BigIntegerField(default=0) 
    pending_money = models.BigIntegerField(default=0)
    locked_money = models.BigIntegerField(default=0)
    penalty_money = models.BigIntegerField(default=0)

    # withdrawal
    withdrawn_requested = models.BooleanField(default=False)


class SpecialAccountDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='special_account_details')
    date_of_start = models.DateField()
    date_of_end = models.DateField()
    price = models.BigIntegerField(default=0)
    duration = models.IntegerField(default=0)


class WithdrawnDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='withdrawn_details')
    amount = models.BigIntegerField(default=0)
    datetime_of_accept = models.DateTimeField()
    datetime_of_clearing = models.DateTimeField()


class VerificationCode(models.Model):
    mobile_number = models.CharField(max_length=20, unique=True, primary_key=True)
    code = models.IntegerField()
    expired_at = models.DateTimeField(default=timezone.now)

class Feedback(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='feedbacks')
    message = models.CharField(max_length=6000)
    date = models.DateTimeField(default=timezone.now)


class Discount(models.Model):
    code = models.CharField(max_length=6, unique=True, primary_key=True)
    discount_percent  = models.FloatField(default=0.0)

class SignupPictures(models.Model):
    sign_up1 = models.ImageField(upload_to='item_images/signup/')
    sign_up2 = models.ImageField(upload_to='item_images/signup/')
    sign_up3 = models.ImageField(upload_to='item_images/signup/')
    login1 = models.ImageField(upload_to='item_images/signup/')
