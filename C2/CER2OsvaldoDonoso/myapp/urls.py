
from django.urls import path, include
from . import views
from .views import EventoListView, EventoDetailView, RegisterView, RegistroToggleView, MisRegistrosListView

urlpatterns = [
    
    # Rutas Principales de la Aplicación
    path('', views.home_view, name='home'), 
    path('eventos/', EventoListView.as_view(), name='eventos'),
    path('eventos/<int:pk>/', EventoDetailView.as_view(), name='detalle_evento'),
    path('comunidad/', views.comunidad_view, name='comunidad'),
    path('mis-eventos/', MisRegistrosListView.as_view(), name='mis_registros'),
    path('evento/<int:pk>/registro/', views.toggle_registro_view, name='toggle_registro'),
    
    # Rutas de Registro y Eventos
    path('register/', RegisterView.as_view(), name='register'),
    path('evento/toggle/<int:pk>/', RegistroToggleView.as_view(), name='registro_toggle'),

    path('accounts/', include('django.contrib.auth.urls')), 

]