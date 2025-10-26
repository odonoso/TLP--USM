
from django import template
from myapp.models import Registro 

register = template.Library()

@register.filter(name='is_registered')
def is_registered(user, evento):
    """
    Verifica si un usuario autenticado está registrado en un evento específico.
    """
    if not user.is_authenticated:
        return False
    return Registro.objects.filter(usuario=user, evento=evento).exists()