// mi_javascript.js

// Este script contiene la lógica de cuenta regresiva para el próximo evento.
// Se basa en la variable 'eventDate' pasada globalmente desde el bloque {% scripts %} de index.html.

// 1. Verificar si la variable 'eventDate' está definida (es decir, si hay un próximo evento en la DB).
if (typeof eventDate !== 'undefined' && eventDate) {
    
    // Convertir la cadena de fecha de Django a milisegundos para el cálculo.
    // Ejemplo de formato esperado: 'Oct 26, 2025 18:00:00'
    const countdownDate = new Date(eventDate).getTime();
    
    // Elementos del DOM
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const messageEl = document.getElementById("mensaje");
    const countdownContainer = document.getElementById("countdown-container");

    /**
     * Muestra el mensaje de evento finalizado u ocurrido y oculta el contador.
     */
    function showEventEndedMessage() {
        if (countdownContainer) countdownContainer.style.display = "none";
        // El texto del h2 en index.html se actualiza
        if (messageEl) messageEl.textContent = "¡El evento está en curso o ha finalizado!";
        
        // Limpia los números para evitar mostrar texto de tiempo negativo
        if (daysEl) daysEl.innerHTML = "00";
        if (hoursEl) hoursEl.innerHTML = "00";
        if (minutesEl) minutesEl.innerHTML = "00";
        if (secondsEl) secondsEl.innerHTML = "00";
    }

    // Iniciar el intervalo de la cuenta regresiva
    const x = setInterval(function() {
        
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el display con un '0' a la izquierda (padStart)
        if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');

        // Detener el contador si el evento ya pasó
        if (distance < 0) {
            clearInterval(x);
            showEventEndedMessage();
        }
    }, 1000);

} else {
    // Si no hay fecha de evento (Django no encontró un 'proximo_evento'), 
    // asegura que el contador esté oculto para evitar mostrar números o errores.
    const countdownContainer = document.getElementById("countdown-container");
    if (countdownContainer) {
        countdownContainer.style.display = 'none';
    }
}