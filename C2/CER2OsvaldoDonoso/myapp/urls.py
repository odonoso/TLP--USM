
from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from .views import EventoListView, EventoDetailView, RegisterView, RegistroToggleView, MisRegistrosListView

urlpatterns = [
    
    path('', views.home_view, name='home'), 
    path('eventos/', EventoListView.as_view(), name='eventos'),
    path('eventos/<int:pk>/', EventoDetailView.as_view(), name='detalle_evento'),
    path('register/', RegisterView.as_view(), name='register'),
    path('comunidad/', views.comunidad_view, name='comunidad'),
    path('evento/toggle/<int:pk>/', RegistroToggleView.as_view(), name='registro_toggle'),
    path('mis-eventos/', MisRegistrosListView.as_view(), name='mis_registros'),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),

]