function countdown() {
    const countDownDate = new Date("2025-09-07T19:55:00").getTime();
    
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
    titulo: "la gran fonda enjoy",
    fechaHora: "17 de septiembre, 20:00 hrs.",
    lugar: "en alguna parte de malasia (Maaaaan, idk)",
    valor: "$15.000 (pre-venta)(shiii be expensive)",
    imagen: "img/evento_2.jpeg",
    descripcion: "Únete a nosotros para tiki tiki tiki uyuyuy pariente, comase una empanada, tomese un terremoto compaire."
  },
  {
    id: "dos", 
    titulo: "circo los paleta",
    fechaHora: "10 de noviembre, 11:00 hrs.",
    lugar: "quillota... talvez... creo, talvez no",
    valor: "Gratuito (bro this be broke boys man)",
    imagen: "img/evento_3.jpeg",
    descripcion: "According to all known laws of aviation, there is no way a bee should be able to fly."
  },
  {
    id: "tres", 
    titulo: "spring party",
    fechaHora: "15 de noviembre, 09:00 hrs.",
    lugar: "Fundo El Rebaño, Viña del Mar, Valparaíso",
    valor: "$5.000",
    imagen: "img/evento_4.jpeg",
    descripcion: "fiesta"
  }
];

function cargarEventos() {
    const contenedorEventos = document.getElementById("eventos-container");
    if (contenedorEventos) {
        let htmlCards = '';
        eventos.forEach(evento => {
            htmlCards += `
                <div class="col">
                    <a href="detalles_evento.html?id=${evento.id}" class="card h-100 text-decoration-none text-dark eventos-format">
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
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        countdown();
    }
    if (window.location.pathname.endsWith('eventos.html')) {
        cargarEventos();
    }
    if (window.location.pathname.endsWith('detalles_evento.html')) {
        cargarDetalleEvento();
    }
});