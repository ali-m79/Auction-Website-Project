from django.urls import re_path, include
from django.urls import path
from django.contrib import admin
from . import views


urlpatterns = [
    re_path('submit', views.submit),
    re_path('remove', views.remove),
    re_path('item_by_categories',views.item_by_categories),
    re_path('search', views.search),
    re_path('filter',views.filter) ,
    re_path('comment/submit', views.comment_submit),
    re_path('comment/view', views.comment_view),
    re_path('participate', views.participate),
    re_path('new_bid', views.new_bid),
    re_path('get_item',views.get_item_by_link),
    re_path('report',views.report_item),


]
