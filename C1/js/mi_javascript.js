function countdown() {

    const countDownDate = new Date("2025-09-07T11:00:00").getTime();
    
    
    function showEventStartedMessage() {
        const countdownContainer = document.getElementById("countdown-container");
        if (countdownContainer) {
            countdownContainer.style.display = "none";
        }
        const heroSection = document.querySelector(".hero-section .container");
        if (heroSection) {
            const message = document.createElement("h2");
            message.textContent = "¡El evento ha comenzado!";
            heroSection.appendChild(message);
        }
    }

    const now = new Date().getTime();
    const distance = countDownDate - now;

    
    if (distance <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        showEventStartedMessage();
        return; 
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