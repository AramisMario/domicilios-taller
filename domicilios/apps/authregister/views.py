from django.shortcuts import render
from rest_framework.response import *
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from apps.service.models import *
from apps.service.serializers import *
from rest_framework.permissions import IsAuthenticated
import hashlib
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from apps.authregister.jwtbackend import JWTAuthentication
from rest_framework.authentication import get_authorization_header
from apps.authregister.custompermissionclasses import *
import os
import jwt, json
# Create your views here.

class SignUp(APIView):
    parser_classess = (JSONParser,)
    authentication_classes = ()
    def post(self,request, format=None):
        data = request.data.copy()
        data["password"] = hashlib.sha256(data["password"].encode()).hexdigest()
        usuario = UsuariosSerializerInput(data = data)
        if usuario.is_valid():
            usuario.save()
            usuario = Usuarios.objects.get(telefono=data["telefono"],email=data["email"])
            return Response({"token":usuario.token},status = status.HTTP_201_CREATED)
        return Response({"mensaje":"algo fue mal"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)

class SignIn(APIView):
    parser_classes = (JSONParser,)
    authentication_classes = ()
    def post(self,request,format = None):
        data = request.data.copy()
        password = hashlib.sha256(request.data['password'].encode()).hexdigest()
        try:
            usuario = Usuarios.objects.get(email = data['email'], password = password)
        except ObjectDoesNotExist:
            return Response({"mensaje":"No exite el usuario"})
        else:
            return Response({'token':usuario.token})
        return Response({'mensaje':'algo fue mal'})
