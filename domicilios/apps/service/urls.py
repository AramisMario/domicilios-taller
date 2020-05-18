from django.urls import path
from apps.service.views import *

urlpatterns = [
    path('usuarios/',UsuariosView.as_view()),
    path('empresas/',EmpresasView.as_view()),
    path('domicilios/',DomiciliosView.as_view()),
    path('productos/',ProductosView.as_view()),
    path('pedidos/',PedidosView.as_view()),
    path('cancelarDomicilio/',CancelarPedidoView.as_view())
]
