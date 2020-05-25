from django.shortcuts import render
from rest_framework.views import APIView
from apps.service.models import *
from rest_framework import status
from apps.service.serializers import *
from rest_framework.response import Response
from apps.authregister.custompermissionclasses import *
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from apps.authregister.jwtbackend import JWTAuthentication
from rest_framework.authentication import get_authorization_header
from django.db import transaction
import jwt
import os
# Create your views here.

def getUserIdFromToken(request):
    token = get_authorization_header(request).split()[1]
    try:
        payload = jwt.decode(token,os.environ["SECRETKEY"])
        return payload["id"]
    except:
        return None



class UsuariosView(APIView):

    renderer_classes = (JSONRenderer,)
    def get(self, request, format = None):
        usuarios = Usuarios.objects.all()
        usuariosSerialized = UsuariosSerializer(usuarios,many=True)
        context = {"usuarios":usuariosSerialized.data}
        return Response(context)


class EmpresasView(APIView):

    renderer_classes = (JSONRenderer,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = [UserPermission]

    def get(self, request, format = None):
        empresas = Empresas.objects.all()
        empresasSerialized = EmpresasSerializer(empresas, many=True)
        context = {"empresas":empresasSerialized.data}
        return Response(context)

class CancelarPedidoView(APIView):
    renderer_classes = (JSONRenderer,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = [UserPermission]

    def post(self, request, format = None):
        pk = request.data["pk"]
        pedido = Domicilios.objects.get(pk=pk)
        pedido.cancelarDomicilio()
        pedido.save()
        return Response({"message":"cancelado"})




class DomiciliosView(APIView):

    renderer_classes = (JSONRenderer,)
    parser_classes = (JSONParser,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = [UserPermission]

    def get(self, request, format = None):
        usuarioId = getUserIdFromToken(request)

        if(usuarioId != None):
            usuario = Usuarios.objects.get(pk=usuarioId)
            pedidos = usuario.pedidosPendientes()
            return Response({"pedidos":pedidos})
        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format = None):
        usuarioId = getUserIdFromToken(request)
        if(usuarioId != None):
            INFORMACION_DOMICILIO= request.data
            Domicilios.customManager.registrarDomicilio(usuarioId,INFORMACION_DOMICILIO["direccion"])
            ultimoDomicilio = Domicilios.objects.latest('id')
            DATA = {"productos":INFORMACION_DOMICILIO["productoId"],"domicilios":ultimoDomicilio.id}
            detalle = DetallesDomicilioSerializer(data=DATA)
            if detalle.is_valid():
                detalle.save()
                return Response(status = status.HTTP_201_CREATED)
        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductosView(APIView):

    renderer_classes = (JSONRenderer,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = [UserPermission]

    def get(self, request, format = None):
        productos = Productos.objects.all()
        productosSerialized = ProductosSerializer(productos, many = True)
        context = {"productos":productosSerialized.data}
        return Response(context)

class PagoView(APIView):

    renderer_classes = (JSONRenderer,)
    authentication_classes = (JWTAuthentication,)
    permission_classes = [UserPermission]

    def put(self, request, format = None):
        usuarioId = getUserIdFromToken(request)
        if(usuarioId != None):
            usuario = Usuarios.objects.get(pk=usuarioId)
            empresa = Empresas.objects.get(pk=request.data["empresaId"])
            domicilio = Domicilios.objects.get(pk=request.data["id"])
            with transaction.atomic():
                usuario.dinero = usuario.dinero - request.data["precioProducto"]
                empresa.dinero = empresa.dinero + request.data["precioProducto"]
                domicilio.pagado = 1
                domicilio.save()
                usuario.save()
                empresa.save()
            return Response({"message":"pagado"})
        return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
