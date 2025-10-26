# myapp/views.py

from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.contrib import messages
from django.utils.timezone import now 
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required 
from django.urls import reverse
from django.utils import timezone
from .models import Evento, Registro
from .forms import UserRegisterForm 
from .models import Evento, Registro, Comentario 
from .forms import UserRegisterForm, ComentarioForm


def home_view(request):
    # Busca el evento más próximo cuya fecha sea mayor a la actual.
    proximo_evento = Evento.objects.filter(
        fecha_hora__gt=timezone.now()
    ).order_by('fecha_hora').first()

    context = {
        'proximo_evento': proximo_evento
    }
    return render(request, 'myapp/home.html', context)


class EventoListView(ListView):
    model = Evento
    template_name = 'myapp/eventos.html'
    context_object_name = 'eventos'
    
    def get_queryset(self):
        return Evento.objects.filter(fecha_hora__gte=now()).order_by('fecha_hora')


class EventoDetailView(DetailView):
    model = Evento
    template_name = 'myapp/detalles_evento.html'
    context_object_name = 'evento'


class RegistroToggleView(LoginRequiredMixin, DetailView):
    model = Evento
    
    def post(self, request, *args, **kwargs):
        evento = self.get_object()
        
        registro_existente = Registro.objects.filter(usuario=request.user, evento=evento).first()

        if registro_existente:
            
            registro_existente.delete()
            messages.success(request, f'Has anulado tu registro para "{evento.titulo}".')
        else:
            
            if evento.plazas_disponibles > 0:
                Registro.objects.create(usuario=request.user, evento=evento)
                messages.success(request, f'¡Registro exitoso para "{evento.titulo}"!')
            else:
                messages.error(request, f'No quedan plazas disponibles para "{evento.titulo}".')

        return HttpResponseRedirect(evento.get_absolute_url())


class MisRegistrosListView(LoginRequiredMixin, ListView):
    model = Registro
    template_name = 'myapp/mis_registros.html'
    context_object_name = 'mis_registros'

    def get_queryset(self):
        return Registro.objects.filter(
            usuario=self.request.user, 
            evento__fecha_hora__gte=now() 
        ).select_related('evento').order_by('evento__fecha_hora')


class RegisterView(CreateView):
    form_class = UserRegisterForm
    template_name = 'registration/register.html' 
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        messages.success(self.request, '¡Registro exitoso! Ya has iniciado sesión.')
        return super().form_valid(form)

@login_required
def toggle_registro_view(request, pk):
    if request.method == 'POST':
        
        evento = get_object_or_404(Evento, pk=pk)
        user = request.user

        try:
            registro = Registro.objects.get(usuario=user, evento=evento)
            registro.delete()
        except Registro.DoesNotExist:
            Registro.objects.create(usuario=user, evento=evento) 
        
        return redirect('detalle_evento', pk=evento.pk)

    return redirect('detalle_evento', pk=pk)

def comunidad_view(request):
    return render(request, 'myapp/comunidad.html')

@login_required 
def comunidad_view(request):
    
    comentarios = Comentario.objects.all()
    
    if request.method == 'POST':
        
        form = ComentarioForm(request.POST)
        if form.is_valid():
            
            nuevo_comentario = form.save(commit=False)
            nuevo_comentario.usuario = request.user
            nuevo_comentario.save()
            messages.success(request, 'Mensaje publicado con éxito.')
            
            return HttpResponseRedirect(reverse('comunidad')) 
    else:
        
        form = ComentarioForm()
    
    context = {
        'comentarios': comentarios,
        'form': form
    }
    return render(request, 'myapp/comunidad.html', context)