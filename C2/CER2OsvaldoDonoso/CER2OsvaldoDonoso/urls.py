from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # REQ05: Acceso al panel de administración 
    path('', include('myapp.urls')),
    path('accounts/', include('django.contrib.auth.urls')), # login, logout, etc.
    path('register/', include('myapp.urls')), # Ruta de registro separada
]