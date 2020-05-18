from django.db import models
from django.db import connection
import json
from datetime import datetime

class DomiciliosManager(models.Manager):

    def registrarDomicilio(self,UsuarioId,direccion):
        cursor = connection.cursor()
        cursor.execute(""" insert into domicilios(usuario_id,estado,direccion,fecha) values(%s,%s,%s,%s)""",[UsuarioId,"solicitado",direccion,datetime.now()])
        cursor.close()
