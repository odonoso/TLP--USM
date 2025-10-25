# myapp/templatetags/custom_filters.py

from django import template
# ¡IMPORTANTE!: Asegúrate que el modelo Registro ya está definido en myapp/models.py
from myapp.models import Registro 

register = template.Library()

@register.filter(name='is_registered')
def is_registered(user, evento):
    """
    Verifica si un usuario autenticado está registrado en un evento específico.
    """
    if not user.is_authenticated:
        return False
    # La consulta que verifica el registro
    return Registro.objects.filter(usuario=user, evento=evento).exists()