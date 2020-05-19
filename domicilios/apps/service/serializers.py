from rest_framework import serializers
from apps.service.models import *

class UsuariosSerializerOutput(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id','telefono','email','nombre','apellido']
        # extra_kwargs = {'password': {'write_only': True}}

class UsuariosSerializerInput(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id','telefono','email','nombre','apellido','password']

class EmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresas
        fields = ('id','nombre')

class ProductosSerializer(serializers.ModelSerializer):
    empresas = EmpresasSerializer()
    class Meta:
        model = Productos
        fields = ('id','nombre','precio','empresas')

class DomiciliosSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset = Usuarios.objects.all())
    class Meta:
        model = Domicilios
        fields = ('id','usuario','estado','direccion','fecha')

class DetallesDomicilioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detallesdomicilio
        fields = ('id','domicilios','productos')

class PedidosSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    estado = serializers.CharField(max_length=45)
    direccion = serializers.CharField(max_length=100)
    fecha = serializers.DateTimeField()
