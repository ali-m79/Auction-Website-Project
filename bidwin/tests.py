from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from unittest.mock import patch
from .models import *
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from .views import national_code_check
from django.core.mail import EmailMultiAlternatives
from datetime import datetime, timedelta

# test signup 
class SignupViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('signup')
        

    def test_signup_valid_data(self):
        data = {
            "username": "testuser",
            "name": "Test",
            "last_name": "User",
            "password": "TestPass123",
            "password2": "TestPass123",
            "phone": "1234567890",
            "email": "testuser@example.com",
            "national_code": "1273294424",
            "dob": "1990-01-01",
            "gender": "M"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(response.data['user'], 'testuser')
        

    def test_signup_missing_data(self):
        data = {
            # Missing required fields intentionally
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_existing_username(self):
        User.objects.create(username="testuser")
        data = {
            "username": "testuser",
            "name": "Test",
            "last_name": "User",
            "password": "TestPass123",
            "password2": "TestPass123",
            "phone": "12732944424",
            "email": "testuser@example.com",
            "national_code": "1234567890",
            "dob": "1990-01-01",
            "gender": "M"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'],'Username already exists')


    def test_signup_national_code_not_exist(self):
        data = {
            "username": "testuser",
            "name": "Test",
            "last_name": "User",
            "password": "TestPass123",
            "password2": "TestPass123",
            "phone": "1234567890",
            "email": "testuser@example.com",
            "national_code": "invalid_code",  # Simulating non-existent national code
            "dob": "1990-01-01",
            "gender": "M"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'National Code does not exist')

    def test_signup_national_code_already_exists(self):
            existing_user = User.objects.create(username="existing_user")
            existing_national_code = "1273294424"
            UserProfile.objects.create(user=existing_user, national_code=existing_national_code)

            data = {
                "username": "testuser",
                "name": "Test",
                "last_name": "User",
                "password": "TestPass123",
                "password2": "TestPass123",
                "phone": "1273294424",
                "email": "testuser@example.com",
                "national_code": existing_national_code,  # Attempting to sign up with existing national code
                "dob": "1990-01-01",
                "gender": "M"
            }
            response = self.client.post(self.url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(response.data['error'], 'National Code already exists')



# test login
class LoginViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('login')
        self.user = User.objects.create_user(username='testuser', password='TestPass123')

    def test_login_valid_credentials(self):
        data = {
            'username': 'testuser',
            'password': 'TestPass123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('refresh', response.data)
        self.assertIn('access', response.data)
        self.assertEqual(response.data['username'], 'testuser')

    def test_login_missing_credentials(self):
        data = {
            # Missing required fields
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Username and Password are required!')

    def test_login_incorrect_credentials(self):
        data = {
            'username': 'testuser',
            'password': 'WrongPassword123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Username or Password is incorrect!')


#test forget password
class ForgetPasswordRequestViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('forget_password_request')
        self.user = User.objects.create_user(username='testuser', password='TestPass123')
        self.user_profile = UserProfile.objects.create(user=self.user, phone='09131112233')

    @patch('requests.post')
    def test_forget_password_request_valid_user(self, mock_post):
        data = {
            'username': 'testuser',
        }
        mock_post.return_value = MockResponse(status_code=200, json_data={'M': 'OTP request successful'})
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('OTP request successful', response.json()['M'])

    def test_forget_password_request_invalid_user(self):
        data = {
            'username': 'nonexistentuser',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'User Does Not Exist')

    @patch('requests.post')
    def test_forget_password_request_otp_failure(self, mock_post):
        data = {
            'username': 'testuser',
        }
        mock_post.return_value = MockResponse(status_code=500, json_data={'M': 'OTP request failed'})
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('OTP request failed', response.json()['M'])

# MockResponse class to simulate the response object from requests.post
class MockResponse:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self.json_data = json_data

    def json(self):
        return self.json_data

    def raise_for_status(self):
        pass



class NewPasswordViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('new_password')
        self.user = User.objects.create_user(username='testuser', password='TestPass123')

    def test_new_password_success(self):
        data = {
            'username': 'testuser',
            'password1': 'NewPass123',
            'password2': 'NewPass123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Password changed succesfully', response.data['M'])

    def test_new_password_user_not_found(self):
        data = {
            'username': 'nonexistentuser',
            'password1': 'NewPass123',
            'password2': 'NewPass123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['error'], 'user does not found')

    def test_new_password_passwords_not_match(self):
        data = {
            'username': 'testuser',
            'password1': 'NewPass123',
            'password2': 'MismatchPass123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['e'], 'passwords does not match')


class UpdateViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('update')  # Adjust 'update' to your actual URL name
        self.user = User.objects.create_user(username='testuser', password='TestPass123', email='test@example.com')
        self.user_profile = UserProfile.objects.create(user=self.user, phone='09140462125')

    def get_jwt_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def test_update_user_information(self):
        data = {
            'id': self.user.id,
            'username': 'newusername',
            'password': 'NewPass123',
            'email': 'newemail@example.com',
            'phone': '9876543210',
            'state': 'N_s',
            'city': 'New City',
            'address_detail': 'New Address',
            'plaque': '10',
            'floor': '2',
            'postal_code': '12345',
            'land_line_phone': '987654321'
        }
        token = self.get_jwt_token(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['Message'], 'Information has been changed .')

    def test_update_user_not_found(self):
        data = {
            'id': 999,  # Assuming no user has ID 999
            'username': 'newusername',
            'password': 'NewPass123',
            'email': 'newemail@example.com',
            'phone': '9876543210',
        }
        token = self.get_jwt_token(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # You may choose to return HTTP 404 instead
        self.assertEqual(response.data['Message'], 'User not found')




class NationalCodeCheckTests(TestCase):

    def test_valid_national_codes(self):
        valid_codes = ['1273294424', '1286872316']
        for code in valid_codes:
            self.assertTrue(national_code_check(code), f"Expected {code} to be valid.")
    
    def test_invalid_national_codes(self):
        invalid_codes = ['123456', 'abcdefghij', '123456789X', '', '!@#$%^&*()']
        for code in invalid_codes:
            self.assertFalse(national_code_check(code), f"Expected {code} to be invalid.")




class FeedbackViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('feedback')
        self.user = User.objects.create_user(username='testuser', password='TestPass123', email='test@example.com')
        self.user_profile = UserProfile.objects.create(user=self.user, phone='09140462125')

    def get_jwt_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def test_feedback_with_valid_token(self):
        data = {
            'username': 'testuser',
            'message': 'This is a test feedback.'
        }
        token = self.get_jwt_token(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['M'], 'Your feedback added')

  


class EmailViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('email')  # Ensure this matches your url pattern name for the email view

    @patch.object(EmailMultiAlternatives, 'send')
    def test_email_send_success(self, mock_send):
        data = {'email_address': 'test@example.com'}
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('Email sent successfully!', response.content.decode())
        mock_send.assert_called_once()




class CheckDiscountViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('check_discount')  
        self.valid_discount = Discount.objects.create(code='VALID1', discount_percent=20.0)
        self.invalid_discount_code = 'INVAL'

    def test_check_discount_valid_code(self):
        data = {'discount_code': self.valid_discount.code}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['discount'], self.valid_discount.discount_percent)

    def test_check_discount_invalid_code(self):
        data = {'discount_code': self.invalid_discount_code}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['discount'], 0)

    def test_check_discount_missing_code(self):
        data = {}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['discount'], 0)



