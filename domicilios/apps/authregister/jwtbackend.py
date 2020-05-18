from rest_framework.authentication import get_authorization_header, BaseAuthentication
from apps.service.models import Usuarios
from rest_framework import status, exceptions
import os
import jwt, json
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

class JWTAuthentication(BaseAuthentication):

    def authenticate(self,request):
        auth = get_authorization_header(request).split()

        if not auth:
            return None
        if len(auth) == 1:
            return None
        elif len(auth) > 2:
            return None
        elif auth[1] == "":
            return None

        try:
            token = auth[1]
            if token == "null":
                raise exceptions.AuthenticationFailed('Null token not allowed')
            elif token == "":
                raise exceptions.AuthenticationFailed('no token provided')
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)
        else:
            return self.authenticate_credentials(token)

    def authenticate_credentials(self,token):

        try:
            payload = jwt.decode(token,os.environ["SECRETKEY"])
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidSignatureError:
            return None
        else:
            email = payload["email"]
            try:
                usuario = Usuarios.objects.get(email = email)
            except ObjectDoesNotExist:
                usuario = None
            finally:
                if usuario != None:
                    usuario.is_authenticated = True
                    return (usuario,token)
                else:
                    return None
