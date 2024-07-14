"""
URL configuration for bidwin project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, include
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from rest_framework_simplejwt.views import (TokenRefreshView)

import item



urlpatterns = [
    re_path("admin/", admin.site.urls),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('user/signup', views.signup, name='signup'),
    re_path('user/login', views.login, name="login"),
    re_path('user/update', views.update, name="update"),
    re_path('user/profile',views.profile),
    re_path('user/signup_image',views.signup_image),
    re_path('user/login_image',views.login_image),
    re_path('user/log_info',views.login_info),
    re_path('user/forget_password_request',views.forget_password_request, name="forget_password_request"),
    re_path('user/new_password',views.new_password, name="new_password"),
    re_path('user/rate_seller',views.rate_saller),
    re_path('user/add_to_interested_item',views.add_to_interested_item),
    re_path('user/get_interested_item',views.get_interested_item),
    re_path('user/delete_from_interested_item',views.delete_from_interested_item),
    # re_path('user/forgot message', views.otp_forgot_message),  # login with otp sms
    re_path('user/email', views.email, name='email'),  # Email urls
    # re_path('user/test_token', views.test_token),
    path('api/token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.test, name='test'),
    path('logout/', views.logout, name='logout'),
    re_path('home/', views.home, name='home'),

    re_path('user/otp', views.otp),
    re_path('user/verify_otp', views.verify_otp),
    re_path('user/does_number_exist', views.does_number_exist),
    re_path('user/feedback', views.feedback, name='feedback'),
    re_path('user/history',views.history_sell),
    path('item/', include('item.urls')),
    
    re_path('check-discount/', views.check_discount, name='check_discount'),
    re_path('special-account/', views.special_account, name='special_account'),
    re_path('buy-special-account/', views.buy_special_account, name='buy_special_account'),
    re_path('charge-account/', views.charge_account, name='charge_account'),
    re_path('check-withdrawn-and-shaba/', views.check_withdrawn_and_shaba, name='check_withdrawn_and_shaba'),
    re_path('cancel-withdrawn/', views.cancel_withdrawn, name='cancel_withdrawn'),
    re_path('change-shaba/', views.change_shaba, name='change_shaba'),
    re_path('create-withdrawn/', views.create_withdrawn, name='create_withdrawn'),

]
urlpatterns += static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)


