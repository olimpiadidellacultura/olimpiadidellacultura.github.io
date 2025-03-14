// Configurazione immagini
const backgrounds = [
  'images/foto1.webp',
  'images/foto2.webp',
  'images/foto3.webp',
  'images/foto4.webp',
  'images/foto5.webp',
  'images/foto6.webp',
  'images/mobile.webp'
];

// Precàrica immagini
function preloadImages() {
  const promises = backgrounds.map(img => {
    return new Promise((resolve, reject) => {
      const preloader = new Image();
      preloader.src = img;
      preloader.onload = resolve;
      preloader.onerror = reject;
    });
  });
  return Promise.all(promises);
}

// Gestione sfondi
function getRandomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function changeBackground() {
  const container = document.querySelector('.background-fade');
  const newBg = `url('${getRandomBackground()}')`;
  
  const newBackground = document.createElement('div');
  newBackground.className = 'background-fade';
  newBackground.style.backgroundImage = newBg;
  
  container.parentNode.appendChild(newBackground);
  
  setTimeout(() => {
    newBackground.classList.add('active');
    setTimeout(() => container.remove(), 1500);
  }, 100);
}

// Countdown
const targetDate = new Date(2025, 3, 24, 17, 30, 0).getTime();

function updateSpan(id, value) {
  const span = document.getElementById(id);
  if (span.innerText !== String(value)) {
    span.innerText = value;
    span.classList.add("update");
    setTimeout(() => span.classList.remove("update"), 500);
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    preloadImages(),
    new Promise(resolve => setTimeout(resolve, 2000)) // Minimo 2 secondi
  ]).then(() => {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.content').style.opacity = '1';
    document.documentElement.style.overflow = 'auto';
    
    // Avvia sfondi
    const initialBg = document.querySelector('.background-fade');
    initialBg.style.backgroundImage = `url('${getRandomBackground()}')`;
    initialBg.classList.add('active');
    setInterval(changeBackground, 5000);
    
    // Avvia countdown
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
  });
});