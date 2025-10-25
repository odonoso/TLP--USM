# myapp/views.py

from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.contrib import messages
from django.utils.timezone import now 

from .models import Evento, Registro
from .forms import UserRegisterForm # Asegúrate de que este archivo exista

# REQ03: Vista de la página de inicio
def home_view(request):
    # CORRECCIÓN: Filtra por eventos cuya fecha_hora es mayor o igual (gte) a la hora actual.
    proximo_evento = Evento.objects.filter(fecha_hora__gte=now()).order_by('fecha_hora').first()
    return render(request, 'myapp/index.html', {'proximo_evento': proximo_evento})

# REQ03: Listado de Eventos
class EventoListView(ListView):
    model = Evento
    template_name = 'myapp/eventos.html'
    context_object_name = 'eventos'
    
    def get_queryset(self):
        return Evento.objects.filter(fecha_hora__gte=now()).order_by('fecha_hora')

# REQ03: Detalles de Evento
class EventoDetailView(DetailView):
    model = Evento
    template_name = 'myapp/detalles_evento.html'
    context_object_name = 'evento'

# REQ06 (Registrarse) y REQ07 (Anular Registro)
class RegistroToggleView(LoginRequiredMixin, DetailView):
    model = Evento
    
    def post(self, request, *args, **kwargs):
        evento = self.get_object()
        
        registro_existente = Registro.objects.filter(usuario=request.user, evento=evento).first()

        if registro_existente:
            # REQ07: Anular Registro
            registro_existente.delete()
            messages.success(request, f'Has anulado tu registro para "{evento.titulo}".')
        else:
            # REQ06: Registrarse
            if evento.plazas_disponibles > 0:
                Registro.objects.create(usuario=request.user, evento=evento)
                messages.success(request, f'¡Registro exitoso para "{evento.titulo}"!')
            else:
                messages.error(request, f'No quedan plazas disponibles para "{evento.titulo}".')

        return HttpResponseRedirect(evento.get_absolute_url())

# REQ07: Cliente registrado: Ver el listado de eventos a los que asistirá
class MisRegistrosListView(LoginRequiredMixin, ListView):
    model = Registro
    template_name = 'myapp/mis_registros.html'
    context_object_name = 'mis_registros'

    def get_queryset(self):
        return Registro.objects.filter(
            usuario=self.request.user, 
            evento__fecha_hora__gte=now() 
        ).select_related('evento').order_by('evento__fecha_hora')

# REQ04: Registro de Usuarios
class RegisterView(CreateView):
    form_class = UserRegisterForm
    template_name = 'registration/register.html' 
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        messages.success(self.request, '¡Registro exitoso! Ya has iniciado sesión.')
        return super().form_valid(form)

# Vista para la comunidad
def comunidad_view(request):
    return render(request, 'myapp/comunidad.html')