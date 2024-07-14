from rest_framework import serializers
from .models import Phone
from .models import Laptop
from .models import Console

class ItemSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField()

    class Meta:
        model = Phone
        fields = ['id', 'title', 'price', 'description', 'owner', 'release_date', 'expiration_date', 'image_urls', 'bid_number', 'created_date']

    def get_image_urls(self, item):
        return [self.context['request'].build_absolute_uri(image.image.url) for image in item.images.all()]