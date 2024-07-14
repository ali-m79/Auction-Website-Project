from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Item
from .models import ItemImage
from .models import UserProfile
from django.contrib.auth.models import User
from .models import Comment
from .models import Participate
from .models import Phone
from .models import Laptop
from .models import Console
from .models import ItemImage , Report
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.response import Response
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.views.decorators.csrf import csrf_exempt


from bidwin.models import Account



# POST NEW ITEM BY ITS OWNER
@api_view(['POST'])                            
def submit (request) :

    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
    relesed_date_and_time = parse_datetime(request.data.get('relesed_date_and_time'))
    owner = user
    item_type = request.data.get('item_type')
    common_data = {
    'title': request.data.get('title'),
    'price': request.data.get('price'),
    'description': request.data.get('description'),
    'owner': owner,
    'release_date': relesed_date_and_time,  # Directly assign the variable without creating a new variable
    'created_date': timezone.localtime(timezone.now()),  # Directly call the function without assignment
    'ram': request.data.get('ram'),
    'storage': request.data.get('storage') ,
    'brand' : request.data.get('brand'),
    'core_number' : request.data.get('core_number') ,
    'group':item_type
}

    if item_type == 'phone':
        camera = request.data.get('camera')
        sim_number = request.data.get('sim_number')
        os = request.data.get('os')
        new_item = Phone.objects.create(**common_data, camera=camera, sim_number=sim_number , os = os)
    elif item_type == 'console':
        generation = request.data.get('generation')
        region = request.data.get('region')
        new_item = Console.objects.create(**common_data, generation=generation, region=region)
    elif item_type == 'laptop':
        cpu = request.data.get('cpu')
        gpu = request.data.get('gpu')
        os = request.data.get('os')
        new_item = Laptop.objects.create(**common_data, cpu=cpu, gpu=gpu , os = os)
    else:
        return Response({'error': 'Invalid item type specified'}, status=status.HTTP_400_BAD_REQUEST)
    
    id = new_item.id 
    id = new_item.id
    new_item.link = 'http://127.0.0.1:8000/item/get_item?id=' + str(id)
    new_item.save()
    images = request.FILES.getlist('images')  # Assuming the images are uploaded with the key 'images'
    for image in images:
        item_image = ItemImage.objects.create(item=new_item, image=image)
    return Response({'M': 'Item created succesfully'}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['DELETE'])
def remove (request) :

    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
    item_id = request.data.get('item_id')
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    if not Participate.objects.filter(item=item).exists() :
        item.delete()
        return Response({'M': 'Item removed successfully'}, status=status.HTTP_200_OK)
    else :
       account = Account.objects.get(user = user)
       account.penalty_money += 200000
       account.save()
       item.delete()
       return Response({'M': 'Item removed successfully with penalty'}, status=status.HTTP_200_OK)

# FIND AN ITEM BY ITS NAME (SEARCH)
@api_view(['GET'])
def search (request) :
    name = request.GET.get('name', '')
    items = Item.objects.filter(Q(title__icontains=name))
    items_data = []
    for item in items:
        items_data.append(find_item(request,item.id))

    if items_data : 
        return Response(items_data,status=status.HTTP_200_OK)
    else :
        return Response({'error': 'Items does not found'},status=status.HTTP_400_BAD_REQUEST)

# SUBMIT A NEW COOMENT FOR AN ITEM
@api_view(['POST'])
def comment_submit(request) :
    

    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    new_comment = Comment.objects.create(item_id=request.data.get('item_id'), message=request.data.get('message') ,
                                    owner_id=request.data.get('owner_id'),  date_time=timezone.localtime(timezone.now()),
                                     parent_comment=request.data.get('parent_comment'))
    return Response({'message': 'Comment created successfully'}, status=status.HTTP_201_CREATED)

# VIEW ALL COMMENTS FOR AN ITEM
@api_view(['GET'])
def comment_view(request) :
    id = request.GET.get('id', '')
    comments = Comment.objects.filter(item_id=id)
    if comments is not None :
        comments_data = [{'message': comment.message, 'owner_id': comment.owner_id , 
                          'date_time': comment.date_time} for comment in comments]
        return JsonResponse(comments_data,safe=False)
    else :
        return Response({'error': 'Comment Does Not Found'}, status=status.HTTP_200_OK)   
    
@api_view(['POST'])
def participate(request) :


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    owner = UserProfile.objects.get(username = request.data.get('username'))
    item = Item.objects.get(id = request.data.get('item_id'))
    #top3=calculate_winner_utill_now(request.data.get('item_id'),request.data.get('sugg'))
    new_participation = Participate.objects.create(item_id=item,
                     suggested_price=request.data.get('suggested_price'),
                             date_time= timezone.localtime(timezone.now()))
    new_participation.owner.add(owner)
    return Response({'Your Suggestions Price added'}, status=status.HTTP_200_OK)

# CALCULATE WHO IS WINNER UNTILL NOW (2ND AND 3TH ALSO CALCULATED)
def calculate_winner_utill_now(item_id):
    all_item_participant = Participate.objects.filter(item_id=item_id)
    top3 = all_item_participant.order_by('suggested_price')[:3]
    return top3


# GIVE NEW BID
@api_view(['POST'])
def new_bid(request) :


    authentication_classes = [JWTAuthentication]
    
    # Validate the token and get the user
    token = request.headers.get('Authorization').split()[1]
    jwt_auth = JWTAuthentication()
    try:
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
    except InvalidToken:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


    
    participate = Participate.objects.get(id= request.data.get('id'))

    participate.suggested_price = request.data.get('suggested_price')

    participate.save()
    
    return Response({'Your New Suggestions Price added'}, status=status.HTTP_200_OK)
    
 # FILTER BY AN OBJECT
@api_view(['POST'])
def filter(request) :
    category = request.GET.get('category', '')
    if category == 'phone':
        return filter_phone(request)
    elif (category=='laptop'):
        return filter_laptop(request)
    elif(category=='console'):
        return filter_consol(request) 
    else:
        return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
def item_by_categories(request):
    category = request.GET.get('category', '')

    if category.lower() == 'phone':
        items = Phone.objects.all()
    elif category.lower() == 'console':
        items = Console.objects.all()
    elif category.lower() == 'laptop':
        items = Laptop.objects.all()
    else:
        return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)
    
    items_data = []

    for item in items:
        item_data = {
            'id': item.id,
            'title': item.title,
            'price': item.price,
            'description': item.description,
            'owner': item.owner.username,
            'release_date': item.release_date,
            'expiration_date': item.expiration_date,
            'images': [request.build_absolute_uri(image.image.url) for image in item.images.all()],
            'bid_number': Participate.objects.filter(item=item).count(),
            'link':item.link,
            'created_date': item.created_date
        }

        if isinstance(item, Phone):
            item_data.update({
                'sim_number': item.sim_number,
                'camera': item.camera,
                'os': item.os
            })
        elif isinstance(item, Laptop):
            item_data.update({
                'cpu': item.cpu,
                'gpu': item.gpu,
                'os': item.os
            })
        elif isinstance(item, Console):
            item_data.update({
                'generation': item.generation,
                'region': item.region,
                'controler_number': item.controler_number
            })

        items_data.append(item_data)

    if items_data:
        return Response(items_data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Items not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_item_by_link(request):
    id = request.GET.get('id', '')
    
    item=find_item(id=id , request=request)
    if item:
        return Response(item, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Items not found'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def report_item(request):
    item_id = request.data.get('item_id')
    message = request.data.get('message')
    user = request.user

    if not item_id or not message:
        return Response({'error': 'Item ID and message are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        item = Item.objects.get(id=item_id)
    except Item.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    new_report = Report.objects.create(item=item, message=message, user=user)
    return Response({'message': 'Report created successfully'}, status=status.HTTP_201_CREATED)

    
def filter_phone(request):
    title = request.data.get('title', '')
    min_price = request.data.get('min_price', 0)
    max_price = request.data.get('max_price', 0)
    storage = request.data.get('storage', [])
    ram = request.data.get('ram', [])
    core_number = request.data.get('core_number', [])
    brand = request.data.get('brand', [])

    # Initial filter for Phone objects
    phones = Phone.objects.all()
    
    # Applying filters
    if title:
        phones = phones.filter(title__icontains=title)
    if min_price is not None and max_price is not None:
        phones = phones.filter(price__gte=min_price, price__lte=max_price)
    if storage:
        phones = phones.filter(storage__in=storage)
    if ram:
        phones = phones.filter(ram__in=ram)
    if core_number:
        phones = phones.filter(core_number__in=core_number)
    if brand:
        phones = phones.filter(brand__icontains=brand)

    # Constructing response data with images
    phones_data = []
    for phone in phones:
        image_urls = [request.build_absolute_uri(image.image.url) for image in phone.images.all()]
        phones_data.append({
            'id': phone.id,
            'bid_number': Participate.objects.filter(item=phone).count(),
            'title': phone.title,
            'price': phone.price,
            'description': phone.description,
            'owner': phone.owner.username,
            'release_date': phone.release_date,
            'created_date': phone.created_date,
            'images': image_urls
        })

    if phones_data:
        return Response(phones_data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Items not found'}, status=status.HTTP_400_BAD_REQUEST)
    
def filter_laptop(request):
    title = request.data.get('title', '')
    min_price = request.data.get('min_price', 0)
    max_price = request.data.get('max_price', 0)
    storage = request.data.get('storage', [])
    ram = request.data.get('ram', [])
    core_number = request.data.get('core_number', [])
    brand = request.data.get('brand', [])

    # Initial filter for Phone objects
    laptops = Laptop.objects.all()
    
    # Applying filters
    if title:
        laptops = laptops.filter(title__icontains=title)
    if min_price is not None and max_price is not None:
        laptops = laptops.filter(price__gte=min_price, price__lte=max_price)
    if storage:
        laptops = laptops.filter(storage__in=storage)
    if ram:
        laptops = laptops.filter(ram__in=ram)
    if core_number:
        laptops = laptops.filter(core_number__in=core_number)
    if brand:
        laptops = laptops.filter(brand__icontains=brand)

    # Constructing response data with images
    laptops_data = []
    for laptop in laptops:
        image_urls = [request.build_absolute_uri(image.image.url) for image in laptop.images.all()]
        laptops_data.append({
            'id': laptop.id,
            'bid_number': Participate.objects.filter(item=laptop).count(),
            'title': laptop.title,
            'price': laptop.price,
            'description': laptop.description,
            'owner': laptop.owner.username,
            'release_date': laptop.release_date,
            'created_date': laptop.created_date,
            'images': image_urls
        })

    if laptops_data:
        return Response(laptops_data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Items not found'}, status=status.HTTP_400_BAD_REQUEST)
    

def filter_consol(request):
    min_price = request.data.get('min_price')
    max_price = request.data.get('max_price')
    storage = request.data.get('storage', [])
    ram = request.data.get('ram', [])
    core_number = request.data.get('core_number', [])
    brand = request.data.get('brand', [])
    region = request.data.get('region',[])
    controlerNumber = request.data.get('controler_number',[])

    # Initial filter for Phone objects
    consols = Console.objects.all()
    
    #Applying filters
    if min_price is not None and max_price is not None:
        consols = consols.filter(price__gte=min_price, price__lte=max_price)
    if storage:
        consols = consols.filter(storage__in=storage)
    if ram:
        consols = consols.filter(ram__in=ram)
    if core_number:
        consols = consols.filter(core_number__in=core_number)
    if brand:
        consols = consols.filter(brand__icontains=brand)
    if region:
        consols = consols.filter(region__in=region)
    if controlerNumber :
        consols = consols.filter(controler_number__in=controlerNumber)

    # Constructing response data with images
    consoles_data = []
    for console in consols:
        image_urls = [request.build_absolute_uri(image.image.url) for image in console.images.all()]
        consoles_data.append({
            'id': console.id,
            'bid_number': Participate.objects.filter(item=console).count(),
            'title': console.title,
            'price': console.price,
            'description': console.description,
            'owner': console.owner.username,
            'release_date': console.release_date,
            'expiration_date':console.expiration_date,
            'created_date': console.created_date,
            'link':console.link,
            'images': image_urls
        })

    if consoles_data:
        return Response(consoles_data, status=status.HTTP_200_OK)
    else:
        return Response(consoles_data, status=status.HTTP_200_OK)
    

def find_item (request,id):
    item = Item.objects.get(id = id) 
    image_urls = [request.build_absolute_uri(image.image.url) for image in item.images.all()]
    if item is not None :
     response_data = {
    'id': item.id,
    'title': item.title,
    'price': item.price,
    'description': item.description,
    'owner': item.owner.username,
    'release_date': item.release_date,
    'expiration_date': item.expiration_date,
    'images': image_urls,
    'link':item.link,
    'bid_number': Participate.objects.filter(item=item).count(),
    'created_date': item.created_date
}
     if item.group == 'phone':
         phone = Phone.objects.get(id = item.id)
         response_data.update({
        'sim_number': phone.sim_number,
        'camera': phone.camera,
        'os': phone.os
    })
     elif item.group == 'laptop':
         laptop = Laptop.objects.get(id = item.id)
         response_data.update({
        'cpu': laptop.cpu ,
        'gpu': laptop.gpu,
        'os': laptop.os
    })
     elif item.group == 'console':
         console = Console.objects.get(id = item.id)
         response_data.update({
        'generation': console.generation ,
        'region': console.region,
        'controler_number': console.controler_number
    })


     return response_data
    else :
        return Response({'error : items not found'} , status=status.HTTP_400_BAD_REQUEST)
    
