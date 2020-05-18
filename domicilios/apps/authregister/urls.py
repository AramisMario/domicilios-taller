from django.urls import path
from apps.authregister.views import *

urlpatterns = [
    path('signin/',SignIn.as_view()),
    path('signup/',SignUp.as_view()),
]
