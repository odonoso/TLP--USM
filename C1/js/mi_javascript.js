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
        
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            showEventStartedMessage();
        }
    }, 1000);
}
countdown()