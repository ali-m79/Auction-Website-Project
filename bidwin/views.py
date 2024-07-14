import os
from datetime import timedelta, datetime, timezone
from email.mime.image import MIMEImage
from rest_framework.decorators import api_view
from .models import User, Account
from django.contrib.auth.hashers import check_password
from django.contrib.sites import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import UserProfile , SignupPictures , Address
from item.models import Interested
from item.models import Item
from item.models import Winner_item
from item.views import find_item
from django.contrib.auth.models import User
from .models import VerificationCode
from .serializers import UserSerrilizaer
from .models import Feedback
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_protect
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .utils.sms_utils import send_verification_sms
from django.utils import timezone
from django.contrib.auth import authenticate
import random
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status, request
from rest_framework.response import Response
from .serializers import UserSerrilizaer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view 
from .models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, logout
from .models import Discount, SpecialAccountDetails, WithdrawnDetails
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from bidwin import settings
import requests



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# USER SIGN UP
@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    name = request.data.get("name")
    last_name = request.data.get("last_name")
    password = request.data.get("password")
    password2 = request.data.get("password2")
    phone = request.data.get("phone")
    email = request.data.get("email")
    national_code = request.data.get("national_code")
    dob = request.data.get("dob")
    gender = request.data.get("gender")

    if (username or password) is None:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not national_code_check(national_code):
        return Response({'error': 'National Code does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    if UserProfile.objects.filter(national_code=national_code).exists():
        return Response({'error': 'National Code already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    if UserProfile.objects.filter(phone=phone).exists():
        return Response({'error': 'phone already exists'}, status=status.HTTP_400_BAD_REQUEST) 

    hashed_password = make_password(password)
    current_local_datetime = timezone.localtime(timezone.now())

    serilizer = UserSerrilizaer(data=request.data)
    if serilizer.is_valid():
        serilizer.save()
        user = User.objects.get(username=request.data.get("username"))
        user.set_password(request.data.get("password"))
        user.first_name = name
        user.last_name = last_name
        user.save()
        UserProfile.objects.create(
            user = user , phone = phone , national_code = national_code 
        )
        return Response({"user":user.username},status=status.HTTP_201_CREATED)
    return Response(serilizer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def signup_image(request):
    sign_up_picture=SignupPictures.objects.get(id = 1)

    data = {
            'sign1': sign_up_picture.sign_up1,
            'sign2': sign_up_picture.sign_up2,
            'sign3': sign_up_picture.sign_up3
        }
    return Response(data,status=status.HTTP_200_OK)


    

# USER LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if(username or password) is None:
        return Response({'error':'Username and Password are required!'},status=status.HTTP_400_BAD_REQUEST)
    if user is not None:
            refresh = MyTokenObtainPairSerializer.get_token(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': refresh['username'],
            },status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Username or Password is incorrect!'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
def login_image(request):
    sign_up_picture=SignupPictures.objects.get(id = 1)

    data = {
            'login': sign_up_picture.login1,
        }
    return Response(data,status=status.HTTP_200_OK)
    
@api_view(['GET'])
def login_info(request):
    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    userProfile=UserProfile.objects.get(user = user)
    try:
        user_profile = UserProfile.objects.get(user=user)
        image = user_profile.image.url if user_profile.image else None
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    data = {
            'username': user.username,
            'name': user.first_name,
            'last name': user.last_name,
            'image' : image
        }
    return Response(data,status=status.HTTP_200_OK)

    

@api_view(['POST'])
def forget_password_request(request):
    username = request.data.get("username")    
    try :
        user = User.objects.get(username = username)
    except User.DoesNotExist :
        return Response({'error':'User Does Not Exist'}) 
    
    user_profile = UserProfile.objects.get(user = user)
    mobile_number = user_profile.phone
        
        # Prepare the data for the POST request
    data = {
        'mobile_number': mobile_number
        }
        
        # Send the POST request to the otp view
    response = requests.post('http://127.0.0.1:8000/user/otp/', data=data)

    if response.status_code == 200:
        return JsonResponse({'M': 'OTP request successful'}, status=200)
    else:
        return JsonResponse({'M': 'OTP request failed'}, status=response.status_code)
    
@api_view(['POST'])
def new_password(request):
    username = request.data.get("username")
    password1 = request.data.get("password1")
    password2 = request.data.get("password2")

    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist: 
        return Response({'error':'user does not found'})

    if not password1 == password2 :
        return Response({'e':'passwords does not match'})
    user.set_password(password1)
    user.save()
    return Response({'M':'Password changed succesfully'})


# UPDATE USER INFORMATION BY ITSELF
@api_view(['POST'])
def update(request):


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    if User.objects.filter(id=request.data.get('id')).exists():
     user = User.objects.get(id=request.data.get('id'))
     user_profile = UserProfile.objects.get(user = user)
     if not user_profile.image :
            images = request.FILES.getlist('image')
            if images:
                # Assuming you want to save only the first image
                user_profile.image = images[0]
     if user_profile.address is None :
        state=request.data.get('state')
        if state is not None:
                state = request.data.get('state')
                city = request.data.get('city')
                address_detail = request.data.get('address_detail')
                plaque = request.data.get('plaque')
                floor = request.data.get('floor')
                postal_code = request.data.get('postal_code')
                land_line_phone = request.data.get('land_line_phone')
                address=Address.objects.create(state=state,city=city,address_detail=address_detail
                                    ,plaque=plaque,floor=floor,postal_code=postal_code,land_line_phone=land_line_phone)
                user_profile.address = address

     
     user.username = request.data.get("username")
     user.password = make_password(request.data.get("password"))
     user.email = request.data.get("email")
     user_profile.phone = request.data.get("phone")
     user.save()
     user_profile.user = user
     user_profile.save()
     return Response({'Message': 'Information has been changed .'})
    else :
         return Response({'Message': 'User not found'})


# OTP verification with sms.ir
@csrf_protect
@api_view(['POST'])
def otp(request):
    if request.method == "POST" :
        mobile_number = request.data.get("mobile_number")

        existing_number = VerificationCode.objects.filter(mobile_number=mobile_number).first() 
        verification_code = random.randint(100000, 999999)

        parameters = [
                     {"Name": "Code", "Value": str(verification_code)}
                      ]

        response = send_verification_sms(mobile_number, 100000, parameters)

        if response:
            # SMS sent successfully
            # Store the verification code in the session or database
            if not existing_number :
                VerificationCode.objects.create(
                mobile_number=mobile_number,
                code=verification_code  ,
                expired_at = timezone.now() + timezone.timedelta(minutes=1) )
                return Response({'M': 'Varification successful'}, status=status.HTTP_200_OK)
            else :
                existing_number.code = verification_code
                existing_number.save()
                return Response({'M': 'Varification successful'}, status=status.HTTP_200_OK)
                      
        else:
            # SMS sending failed
            return Response({'M': 'TOKEN FAILD'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'M': 'INVALID METHOD'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
def verify_otp(request):
        entered_code = request.data.get("entered_code")
        mobile_number = request.data.get("mobile_number")

        # Retrieve the saved verification code from the session
        verification_code = VerificationCode.objects.get(
                mobile_number=mobile_number
                         )

        if verification_code is not None:
            if entered_code == verification_code.code:
                # Correct code entered
                # You can perform further actions here, like marking the mobile number as verified
                return JsonResponse({'message': 'Verification successful'}, status=200)
            else:
                # Incorrect code entered
                return JsonResponse({'error': 'Invalid verification code'}, status=400)
        else:
            # No verification code found in the session
            return JsonResponse({'error': 'Verification code not found in session'}, status=400)


@csrf_protect
@api_view(['POST'])
def does_number_exist(request):
    phone = request.data.get("phone")
    existing_number = VerificationCode.objects.filter(mobile_number=phone).first()
     
    if UserProfile.objects.filter(phone=phone).exists():
        

        verification_code = random.randint(100000, 999999)

        parameters = [
                     {"Name": "Code", "Value": str(verification_code)}
                      ]

        response = send_verification_sms(phone, 100000, parameters)

        if response:
            # SMS sent successfully
            # Store the verification code in the session or database
            if not existing_number :
                VerificationCode.objects.create(
                mobile_number=phone,
                code=verification_code  ,
                expired_at = timezone.now() + timezone.timedelta(minutes=1) )
                return Response({'M': 'Varification successful'}, status=status.HTTP_200_OK)
            else :
                existing_number.code = verification_code
                existing_number.save()
                return Response({'M': 'Varification successful'}, status=status.HTTP_200_OK)
                      
        else:
            # SMS sending failed
            return Response({'M': 'TOKEN FAILD'}, status=status.HTTP_400_BAD_REQUEST)

    else :
        return Response({'Message': 'number does not exist'}, status=status.HTTP_200_OK)

# National Code Check
def national_code_check(code):

    code = str(code)
    if not code.isnumeric() or len(code) != 10 :
        return False
    
    total = 0
    control_digit = int(code[-1])
    for digit,index in zip(code,range(10,1,-1)):
        total += int(digit)*index

    reminder = total % 11
    if reminder <2:
        if reminder == control_digit:
          return True
    else:
        if 11-reminder == control_digit:
            return True
    return False

@api_view(['POST'])
def feedback(request):

    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = User.objects.get(username = request.data.get('username'))
    new_feedback = Feedback.objects.create(owner=user, message=request.data.get('message') )
    return Response({'M': 'Your feedback added'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def history_sell(request) :


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    username = request.GET.get('username', '')
    user = User.objects.get(username=username)
    items= Item.objects.get(user = user)

    if items is not None :

     items_data = [{'title': item.title, 'release_date': item.release_date} for item in items]
     return JsonResponse(items_data, safe=False)
    else :
        return Response({'M': 'Items not found'}, status=status.HTTP_400_BAD_REQUEST)

#GET USER ITEM WIN HISTORY
@api_view(['GET'])
def history_win(request) :


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    username = request.GET.get('username', '')
    user = User.objects.get(username=username)
    winned_items = Winner_item.objects.get(user = user)

    items_data = []
    for item in winned_items:
        items_data.append(find_item(request,item.id))

    if items_data : 
        return Response(items_data,status=status.HTTP_200_OK)
    else :
        return Response({'error': 'Items does not found'},status=status.HTTP_400_BAD_REQUEST)



def get_user_from_token(token_string):
    try:
        token = RefreshToken(token_string)
        user = authenticate(request=None, username=token.payload['username'])
        return user
    except Exception as e:
        return None

def is_token_valid(token_string):
    user = get_user_from_token(token_string)
    return user is not None


@api_view(['POST'])
def email(request):
    email_address = request.data.get("email_address")
    html_content = render_to_string('emailTemplate.html', {'context_variable': 'value'})

    # Create the plain text version of the email
    text_content = strip_tags(html_content)

    # Create the EmailMultiAlternatives object
    email = EmailMultiAlternatives(
        subject='helo from django',
        body=text_content,
        from_email='hoseinbm138084@yahoo.com',
        to=[email_address]
    )

    email.attach_alternative(html_content, "text/html")
    email.send()
    if email:
        return HttpResponse('Email sent successfully!')





@csrf_protect
@api_view(['POST'])
def test(request):
    permission_classes = [IsAuthenticated]
    return HttpResponse('its ok')


@csrf_protect
@api_view(['POST'])
def logout(request):
    if request.method == 'POST':
        logout(request)
        return Response({'message': 'Logged out successfully'})
    else:
        return Response({'error': 'Method not allowed'}, status=405)

@csrf_protect
@api_view(['POST'])
def home(request):
    home_products =[
        {
            "title": "آخرین مزایدات",
            "list": [
                {
                    "image": "uyuy",
                    "title": "hjhj",
                    "price": "hkhk",
                    "time": "jkhkj"
                }
            ]
        },
        {
            "title": "محصولات پیشنهادی",
            "list": [
                {
                    "image": "uyuy",
                    "title": "hjhj",
                    "price": "hkhk",
                    "time": "jkhkj"
                }
            ]
        },
        {
            "title": "محبوب ترین ها",
            "list": [
                {
                    "image": "uyuy",
                    "title": "hjhj",
                    "price": "hkhk",
                    "time": "jkhkj"
                }
            ]
        }
    ]
    return Response(home_products)

@api_view(['GET'])
def profile(request) :

    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    username=request.user.username
    user=User.objects.get(username = username)
    if user :
        user_profile = UserProfile.objects.get(user = user)
        address = user_profile.address
        image_url = None
        if user_profile.image:

            image_url = request.build_absolute_uri(user_profile.image.url)
        if user_profile.address_available:
                address_availiable = True
        else :
                address_availiable = False
        data={"name":user.first_name,"last_name": user.last_name,"date_of_membership":
                         user.date_joined,"is_premium":user_profile.is_premium,
                         "address_available":address_availiable,
                "email":user.email,'username':user.username,'dob':user_profile.dob,'gender':user_profile.gender,
                "national_code":user_profile.national_code,"phone":user_profile.phone,
                "image":image_url
                }
        if address_availiable is not False:
            data.update({
                "city":address.city,"plaque":address.plaque,
                "state":address.state,"postal_code":address.postal_code,
                "address_details":address.address_detail,
                "land_line_phone":address.land_line_phone,
                "floor":address.floor,
            })
        return Response(data,status=status.HTTP_200_OK)

    else:
        return Response({'error': 'Method not allowed'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def add_to_interested_item(request):


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    username=request.user.username
    id = request.GET.get('id', '')
    user=User.objects.get(username = username)
    item = Item.objects.get(id  = id)
    Interested.objects.create(user = user , item = item)
    return Response({'M': 'Item Added to Interested'},status=status.HTTP_200_OK)

@api_view(['GET'])
def delete_from_interested_item(request):


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    username=request.user.username
    id = request.GET.get('id', '')
    user=User.objects.get(username = username)
    item = Item.objects.get(id  = id)
    deleted_item=Interested.objects.get(user = user , item = item)
    deleted_item.delete()
    return Response({'M': 'Item Deleted From Interested'},status=status.HTTP_200_OK)


@api_view(['GET'])

def get_interested_item(request):


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    username=request.user.username
    user=User.objects.get(username = username)
    interested_items = Interested.objects.filter(user=user)
    items_data = []
    for interested in interested_items:
        items_data.append(find_item(request,interested.item.id))

    if items_data : 
        return Response(items_data,status=status.HTTP_200_OK)
    else :
        return Response({'error': 'Items does not found'},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def check_discount(request):
    discount_code = request.data.get('discount_code')
    try:
        discount = Discount.objects.get(code=discount_code)
        return Response({'discount': discount.discount_percent})
    except Discount.DoesNotExist:
        return Response({'discount': 0})


@api_view(['GET'])
def special_account(request):
    user = request.user 
    if UserProfile.objects.get(user=user).is_premium:
        special_account_details = SpecialAccountDetails.objects.get(user_profile=user)
        data = {
        "is_premium": True,
         "date_of_start" : special_account_details.date_of_start ,
         "date_of_end" : special_account_details.date_of_end ,
         "price" : special_account_details.price,
         "account_duration" : special_account_details.duration,
         "remaining_days" : (special_account_details.date_of_end - datetime.now().date()).days
         }
        return Response(data)
    else:
        return Response({'is_premium': False})
    

@api_view(['POST'])
def buy_special_account(request):
    user = request.user
    duration = request.data.get('duration')
    price =  request.data.get("price")

    user_profile = UserProfile.objects.get(user=user)
    account = Account.objects.get(user=user)
    if account.withdrawn_money >= price:
        account.withdrawn_money -= price
        account.save()
        SpecialAccountDetails.objects.create(user_profile=user, price=price, duration=duration, date_of_start=datetime.now().date(), date_of_end=datetime.now().date() + timedelta(days=duration))
        user_profile.is_premium = True
        user_profile.save()
        return Response(status=status.HTTP_200_OK)        

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    


@api_view(["POST"])
def charge_account(request):
    user = request.user
    amount = request.data.get("amount")
    if amount > 200000000:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        account = Account.objects.get(user=user)
        account.inventory_money += amount
        account.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def check_withdrawn_and_shaba(request):
    
    user = request.user
    try:
        account = Account.objects.get(user=user)
    except Account.DoesNotExist:
        return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        withdrawn = WithdrawnDetails.objects.get(user=user)
    except WithdrawnDetails.DoesNotExist:
        withdrawn = None

    data = {
        "name": user.first_name,
        "last_name": user.last_name,
        "withdrawn_requested": account.withdrawn_requested,
        "bank_account_accepted": account.bank_account_accepted,
        "shaba_number": account.shaba_number,
        "bank_name": account.bank_name,
        "datetime_of_accept": getattr(withdrawn, 'datetime_of_accept', None),
        "datetime_of_clearing": getattr(withdrawn, 'datetime_of_clearing', None),
        "amount": getattr(withdrawn, 'amount', None),
    }

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def cancel_withdrawn(request):
    user = request.user
    try:
        withdrawn = WithdrawnDetails.objects.get(user=user)
        withdrawn.delete()
        return Response(status=status.HTTP_200_OK)
    except WithdrawnDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def change_shaba(request):
    user = request.user
    shaba = request.data.get("shaba_number")
    bank_name = request.data.get("bank_name")
    account = Account.objects.get(user=user)
    account.shaba_number = shaba
    account.bank_name = bank_name
    account.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def create_withdrawn(request):
    user = request.user
    amount = request.data.get("amount")
    userprofile = UserProfile.objects.get(user=user)
    duration = 12 if userprofile.is_premium else 24
    withdrawn = WithdrawnDetails.objects.create(user=user, amount=amount, datetime_of_accept=datetime.now().date(), datetime_of_clearing=datetime.now().date() + timedelta(hours=duration))
    return Response(status=status.HTTP_200_OK) 


@api_view(['POST'])
def rate_saller(request):
    user = request.data.get('user')
    seller_id = request.data.get('seller_id')
