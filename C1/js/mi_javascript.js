function countdown() {
    const countDownDate = new Date("2025-09-07T16:09:00").getTime();
    function showEventStartedMessage() {
        const countdownContainer = document.getElementById("countdown-container");
        if (countdownContainer) {
            countdownContainer.style.display = "none";
        }
        const h2Element = document.getElementById("mensaje");
        if (h2Element) {
            h2Element.textContent = "¡El evento ha comenzado!";
        }
    }
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (document.getElementById("days")) {
            document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
            document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        }
        if (distance < 0) {
            clearInterval(x);
            showEventStartedMessage();
        }
    }, 1000);
}
const eventos = [
  {
    id: "uno", 
    titulo: "Concierto Benéfico de Rock",
    fechaHora: "25 de octubre, 20:00 hrs.",
    lugar: "Teatro Municipal, Valparaíso",
    valor: "$15.000 (pre-venta)",
    imagen: "img/evento_2.jpeg",
    descripcion: "Únete a nosotros para una noche de música en vivo con las mejores bandas de rock de la región. Todo el dinero recaudado será donado a la fundación 'Música por un Sueño'."
  },
  {
    id: "dos", 
    titulo: "Taller de Fotografía Digital",
    fechaHora: "10 de noviembre, 11:00 hrs.",
    lugar: "Sala de Talleres, Campus Central",
    valor: "Gratuito",
    imagen: "img/evento_3.jpeg",
    descripcion: "Aprende los fundamentos de la fotografía digital, desde la composición hasta la edición básica. Un experto te guiará en los primeros pasos para capturar imágenes increíbles."
  },
  {
    id: "tres", 
    titulo: "Feria de Innovación Tecnológica",
    fechaHora: "15 de noviembre, 09:00 hrs.",
    lugar: "Gimnasio Tech-Hub, Santiago",
    valor: "$5.000",
    imagen: "img/evento_4.jpeg",
    descripcion: "Descubre las últimas tendencias en tecnología. Habrá demostraciones en vivo, charlas con líderes de la industria y la oportunidad de conectar con la comunidad tech."
  }
];
function cargarEventos() {
    const contenedorEventos = document.getElementById("eventos-container");
    if (contenedorEventos) {
        let htmlCards = '';
        eventos.forEach(evento => {
            htmlCards += `
                <div class="col">
                    <a href="detalles_evento.html?id=${evento.id}" target="blank" class="card h-100 text-decoration-none text-dark">
                        <img src="${evento.imagen}" class="card-img-top" alt="${evento.titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${evento.titulo}</h5>
                            <p class="card-text">
                                <strong>Fecha y Hora:</strong> <span>${evento.fechaHora}</span><br>
                                <strong>Lugar:</strong> <span>${evento.lugar}</span><br>
                                <strong>Valor:</strong> <span>${evento.valor}</span>
                            </p>
                        </div>
                    </a>
                </div>
            `;
        });
        contenedorEventos.innerHTML = htmlCards;
    }
}
function cargarDetalleEvento() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');
    const evento = eventos.find(e => e.id === eventId);
    if (evento) {
        document.getElementById("detalle-titulo").textContent = evento.titulo;
        document.getElementById("detalle-titulo-main").textContent = evento.titulo;
        document.getElementById("detalle-imagen").src = evento.imagen;
        document.getElementById("detalle-fecha").textContent = evento.fechaHora;
        document.getElementById("detalle-lugar").textContent = evento.lugar;
        document.getElementById("detalle-valor").textContent = evento.valor;
        document.getElementById("detalle-descripcion").textContent = evento.descripcion;
    } else {
        document.getElementById("detalle-titulo").textContent = "Evento no encontrado.";
        document.getElementById("detalle-imagen").style.display = "none";
        document.getElementById("detalle-descripcion").textContent = "Lo sentimos, el evento que buscas no existe.";
    }
}

// --- NUEVAS FUNCIONES DE COMUNIDAD ---
function cargarComentarios() {
    const muroComentarios = document.getElementById("muro-comentarios");
    if (muroComentarios) {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        muroComentarios.innerHTML = '';
        comentarios.forEach(comentario => {
            const cardHtml = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${comentario.nombre}</h5>
                        <p class="card-text">${comentario.mensaje}</p>
                        <p class="card-text"><small class="text-muted">${comentario.fecha}</small></p>
                    </div>
                </div>
            `;
            muroComentarios.innerHTML += cardHtml;
        });
    }
}
function publicarComentario(event) {
    event.preventDefault();
    const nombreInput = document.getElementById('comentario-nombre');
    const mensajeInput = document.getElementById('comentario-mensaje');
    
    if (nombreInput.value.trim() === '' || mensajeInput.value.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const nuevoComentario = {
        id: Date.now(),
        nombre: nombreInput.value.trim(),
        mensaje: mensajeInput.value.trim(),
        fecha: new Date().toLocaleString()
    };
    comentarios.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    cargarComentarios();
    nombreInput.value = '';
    mensajeInput.value = '';
}
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('index.html')) {
        countdown();
    }
    if (path.endsWith('eventos.html')) {
        cargarEventos();
    }
    if (path.endsWith('detalles_evento.html')) {
        cargarDetalleEvento();
    }
    if (path.endsWith('comunidad.html')) {
        cargarComentarios();
        const form = document.getElementById('comentario-form');
        if (form) {
            form.addEventListener('submit', publicarComentario);
        }
    }
});