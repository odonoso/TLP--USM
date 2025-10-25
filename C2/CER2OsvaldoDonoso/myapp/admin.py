from django.contrib import admin
from .models import Evento, Registro

# Permite ver los asistentes dentro de la vista de Evento (REQ08)
class RegistroInline(admin.TabularInline):
    model = Registro
    extra = 0
    readonly_fields = ('usuario', 'fecha_registro')
    can_delete = False

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    # REQ05: Staff puede gestionar eventos 
    list_display = (
        'titulo', 
        'fecha_hora', 
        'lugar', 
        'valor', 
        'cupo_total', 
        'plazas_disponibles', # REQ08
        'total_asistentes', # REQ08
        'dinero_recaudado' # Staff: dinero recaudado 
    )
    search_fields = ('titulo', 'lugar')
    list_filter = ('fecha_hora', 'lugar')
    inlines = [RegistroInline] # Listado de asistentes (REQ08)
    
    readonly_fields = ('plazas_disponibles', 'dinero_recaudado', 'total_asistentes')

    def total_asistentes(self, obj):
        return obj.registro_set.count()
    total_asistentes.short_description = 'Total Asistentes'