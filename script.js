// Imposta la data di destinazione: 24 aprile 2025, 17:30:00
// Nota: in JavaScript il mese di aprile è indicato con 3 (gennaio = 0)
const targetDate = new Date(2025, 3, 24, 17, 30, 0).getTime();

// Funzione per aggiornare il valore e applicare un effetto di "bounce"
function updateSpan(id, value) {
  const span = document.getElementById(id);
  if (span.innerText !== String(value)) {
    span.innerText = value;
    span.classList.add("update");
    setTimeout(() => span.classList.remove("update"), 500);
  }
}

// Aggiorna il countdown ogni secondo
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  updateSpan("days", days);
  updateSpan("hours", hours);
  updateSpan("minutes", minutes);
  updateSpan("seconds", seconds);
  
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector(".content").innerHTML = "<h1>Il countdown è terminato!</h1>";
  }
}, 1000);
