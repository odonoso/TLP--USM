# myapp/urls.py
from django.urls import path
from .views import (
    home_view, 
    EventoListView, 
    EventoDetailView, 
    RegistroToggleView, 
    MisRegistrosListView, 
    comunidad_view,
    RegisterView
)

urlpatterns = [
    path('', home_view, name='home'),
    path('eventos/', EventoListView.as_view(), name='lista_eventos'),
    path('eventos/<int:pk>/', EventoDetailView.as_view(), name='detalle_evento'), # REQ03
    
    # Rutas para Cliente Registrado
    path('eventos/<int:pk>/toggle_registro/', RegistroToggleView.as_view(), name='toggle_registro'), # REQ06/REQ07
    path('mis-registros/', MisRegistrosListView.as_view(), name='mis_registros'), # REQ07
    path('comunidad/', comunidad_view, name='comunidad'),
    
    # Autenticación
    path('register/', RegisterView.as_view(), name='register'), # REQ04
]