# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from datetime import datetime
from datetime import timedelta
import jwt, json
import os
from apps.service.customModelManagers.domiciliosmanager import *

class Auth(models.Model):
    class Meta:
        abstract = True
    is_authenticated = False

    def generate_jwt_token(self):
        dt = datetime.now() + timedelta(minutes = 7)
        token = jwt.encode({
            'id':self.pk,
            'email':self.email,
            'exp':dt
        },os.environ['SECRETKEY'])
        return token

    @property
    def token(self):
        return self.generate_jwt_token()


class Usuarios(Auth):
    email = models.CharField(max_length=100)
    telefono = models.CharField(max_length=45)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    password = models.TextField()
    dinero = models.FloatField(default=0)
    class Meta:
        managed = False
        db_table = 'usuarios'

    def pedidosPendientes(self):
        cursor = connection.cursor()
        cursor.execute("""select d.id, d.estado, d.direccion, d.fecha, p.nombre, e.nombre, e.id, p.precio, d.pagado
                        from domicilios as d join detallesDomicilio as dd on d.id = dd.domicilios_id
                        join productos as p on p.id = dd.productos_id join empresas as e on e.id = p.empresas_id
                        where usuario_id = %s and
                        (d.estado = 'agendado' or d.estado= 'solicitado' or d.estado='en camino') ORDER BY d.fecha DESC""",[self.pk])

        pedidos = []
        for row in cursor.fetchall():
            pedido = {"id":row[0],"estado":row[1],"direccion":row[2],
                    "fecha":row[3],"producto":row[4],"empresa":row[5],
                    "empresaId":row[6],"precioProducto":row[7],"pagado":row[8]}
            pedidos.append(pedido)
        return pedidos



class Detallesdomicilio(models.Model):
    domicilios = models.ForeignKey('Domicilios', models.DO_NOTHING)
    productos = models.ForeignKey('Productos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'detallesDomicilio'


class Domicilios(models.Model):
    usuario = models.ForeignKey('Usuarios', models.DO_NOTHING)
    estado = models.CharField(max_length=45)
    direccion = models.CharField(max_length=100)
    fecha = models.DateTimeField()
    pagado = models.IntegerField(default=0)

    class Meta:
        managed = False
        db_table = 'domicilios'

    objects = models.Manager()
    customManager = DomiciliosManager()

    def cancelarDomicilio(self):
        self.estado = 'cancelado'


class Empresas(models.Model):
    nombre = models.CharField(max_length=100)
    dinero = models.FloatField(default=0)
    class Meta:
        managed = False
        db_table = 'empresas'


class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.CharField(max_length=10)
    empresas = models.ForeignKey(Empresas, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'productos'
