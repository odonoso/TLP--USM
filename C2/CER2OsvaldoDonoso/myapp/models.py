# myapp/models.py

from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.timezone import now 

class Evento(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_hora = models.DateTimeField()
    lugar = models.CharField(max_length=200)
    imagen_url = models.CharField(max_length=500, default='img/default_event.jpg')
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cupo_total = models.IntegerField(default=0)
    
    @property
    def plazas_disponibles(self):
        inscritos = self.registro_set.count()
        return max(0, self.cupo_total - inscritos)

    @property
    def dinero_recaudado(self):
        return self.registro_set.count() * self.valor

    def __str__(self):
        return self.titulo

    def get_absolute_url(self):
        return reverse('detalle_evento', args=[str(self.id)])

class Registro(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha_registro = models.DateTimeField(default=now)

    class Meta:
        unique_together = ('usuario', 'evento') 
        verbose_name_plural = "Registros"

    def __str__(self):
        return f'{self.usuario.username} registrado en {self.evento.titulo}'

class Comentario(models.Model):

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    mensaje = models.TextField()
    fecha_publicacion = models.DateTimeField(default=now)
    
    class Meta:
        ordering = ['-fecha_publicacion'] 
        verbose_name_plural = "Comentarios"

    def __str__(self):
        return f'Comentario de {self.usuario.username} - {self.fecha_publicacion.strftime("%Y-%m-%d")}'