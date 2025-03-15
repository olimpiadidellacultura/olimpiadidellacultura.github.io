let backgrounds;
let nextBackground;

function changeBackgrounds() {
  if (window.innerWidth < window.innerHeight) {
    backgrounds = [ // Foto verticali
      'images/mobile.webp',
      'images/1.webp',
      'images/2.webp',
      'images/3.webp',
      'images/4.webp',
      'images/5.webp',
      'images/6.webp',
      'images/7.webp',
      'images/8.webp',
      'images/9.webp',
      'images/10.webp',
      'images/11.webp',
      'images/12.webp',
      'images/13.webp',
      'images/14.webp',
      'images/15.webp',
      'images/16.webp',
      'images/17.webp',
      'images/18.webp',
      'images/19.webp',
      'images/20.webp',
      'images/22.webp'
    ];
  } else {
    backgrounds = [ // Foto orizzontali
      'HorizontalImages/foto2.webp',
      'HorizontalImages/foto3.webp',
      'HorizontalImages/foto4.webp',
      'HorizontalImages/foto5.webp',
      'HorizontalImages/foto6.webp',
      'HorizontalImages/IMG_0135.webp',
      'HorizontalImages/IMG_0159.webp',
      'HorizontalImages/IMG_0195.webp',
      'HorizontalImages/IMG_0215.webp',
      'HorizontalImages/IMG_0224.webp',
      'HorizontalImages/IMG_0380.webp',
      'HorizontalImages/IMG_0499.webp',
      'HorizontalImages/IMG_0583.webp',
      'HorizontalImages/IMG_2602.webp',
      'HorizontalImages/tolfa.jpg',
    ];
  }
  nextBackground = getRandomBackground();
  preloadNextBackground();
}

function preloadNextBackground() {
  if (!nextBackground) return;
  const img = new Image();
  img.src = nextBackground;
}

function getRandomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function changeBackground() {
  const container = document.querySelector('.background-fade');
  const newBackground = document.createElement('div');
  newBackground.className = 'background-fade';
  newBackground.style.backgroundImage = `url('${nextBackground}')`;
  
  container.parentNode.appendChild(newBackground);
  setTimeout(() => {
    newBackground.classList.add('active');
    setTimeout(() => container.remove(), 1500);
  }, 100);

  nextBackground = getRandomBackground();
  preloadNextBackground();
}

const TOLFA_COORDS = { latitude: 42.15, longitude: 11.93 };
const EVENT_DATES = {
  start: '2025-04-24',
  end: '2025-04-27',
  targetDate: new Date(2025, 3, 24, 17, 30, 0).getTime()
};

const weatherCodeMap = {
  0: 'Sereno', 1: 'Prevalentemente sereno', 2: 'Parzialmente nuvoloso', 
  3: 'Nuvoloso', 45: 'Nebbia', 48: 'Nebbia gelata', 51: 'Pioviggine leggera', 
  53: 'Pioviggine moderata', 55: 'Pioviggine intensa', 56: 'Pioggia gelata', 
  57: 'Pioggia gelata intensa', 61: 'Pioggia leggera', 63: 'Pioggia moderata', 
  65: 'Pioggia intensa', 66: 'Pioggia gelata', 67: 'Pioggia gelata intensa', 
  71: 'Neve leggera', 73: 'Neve moderata', 75: 'Neve intensa', 77: 'Granelli di neve', 
  80: 'Rovesci leggeri', 81: 'Rovesci moderati', 82: 'Rovesci violenti', 
  85: 'Nevicate leggere', 86: 'Nevicate intense', 95: 'Temporale', 
  96: 'Temporale con grandine', 99: 'Temporale con grandine intensa'
};

function getIconName(code) {
  const customIconMap = {
    0: 'clear-day',
    1: 'clear-day',
    2: 'partly-cloudy-day',
    3: 'cloudy',
    45: 'fog',
    48: 'fog',
    51: 'drizzle',
    53: 'drizzle',
    55: 'drizzle',
    56: 'rain',
    57: 'rain',
    61: 'rain',
    63: 'rain',
    65: 'rain',
    66: 'sleet',
    67: 'sleet',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    80: 'rain',
    81: 'rain',
    82: 'rain',
    85: 'snow',
    86: 'snow',
    95: 'thunderstorms',
    96: 'thunderstorms-rain',
    99: 'thunderstorms-rain'
  };
  return customIconMap[code] || 'unknown';
}

function updateCounter() {
  const now = Date.now();
  const distance = EVENT_DATES.targetDate - now;
  
  if(distance < 0) {
    document.querySelector(".content").innerHTML = "<h1>L'evento è iniziato!</h1>";
    return;
  }

  const days = Math.floor(distance / (1000 * 3600 * 24));
  const hours = Math.floor((distance % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((distance % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

async function getTolfaWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${TOLFA_COORDS.latitude}` +
      `&longitude=${TOLFA_COORDS.longitude}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&forecast_days=4` +
      `&timezone=Europe/Rome`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
      throw new Error('Dati meteo non disponibili');
    }
    
    return data;

  } catch (error) {
    console.error('Errore API Meteo:', error);
    showWeatherError();
    return null;
  }
}

function showWeatherError() {
  const weatherSection = document.querySelector('.weather-section');
  weatherSection.innerHTML = `
    <div class="weather-error">
      <p>⚠️ Previsioni non disponibili</p>
      <small>Aggiorna la pagina o controlla la connessione</small>
    </div>
  `;
}

function createWeatherDay(date, code, maxTemp, minTemp) {
  const dayElement = document.createElement('div');
  dayElement.className = 'weather-day';
  
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  dayElement.innerHTML = `
    <div class="weather-date">${formattedDate}</div>
    <img class="weather-icon-tolfa" 
         src="icons/${getIconName(code)}.svg" 
         alt="${weatherCodeMap[code]}">
    </div>
    <div class="weather-temp-tolfa">
      ${Math.round(maxTemp)}° / ${Math.round(minTemp)}°
    </div>
    <div class="weather-condition">${weatherCodeMap[code] || 'N/D'}</div>
  `;
  
  return dayElement;
}

async function updateTolfaWeather() {
  try {
    const weatherData = await getTolfaWeather();
    if (!weatherData?.daily) throw new Error('Dati meteo non validi');

    const weatherGrid = document.querySelector('.weather-grid');
    weatherGrid.innerHTML = '';

    weatherData.daily.time.forEach((date, index) => {
      const dayData = {
        date,
        code: weatherData.daily.weather_code[index],
        maxTemp: weatherData.daily.temperature_2m_max[index],
        minTemp: weatherData.daily.temperature_2m_min[index]
      };
      
      weatherGrid.appendChild(createWeatherDay(
        dayData.date,
        dayData.code,
        dayData.maxTemp,
        dayData.minTemp
      ));
    });

  } catch (error) {
    console.error('Errore meteo:', error);
    document.querySelector('.weather-section').innerHTML = `
      <p class="weather-error">Previsioni temporaneamente non disponibili</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    changeBackgrounds();
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    document.querySelector('.loader').remove();
    document.querySelector('.content').style.opacity = '1';

    const initialBg = document.querySelector('.background-fade');
    initialBg.style.backgroundImage = `url('${nextBackground}')`;
    initialBg.classList.add('active');

    nextBackground = getRandomBackground();
    preloadNextBackground();

    setInterval(changeBackground, 7000);

    setInterval(updateCounter, 1000);
    updateCounter();

    await updateTolfaWeather();

  } catch (error) {
    console.error('Errore inizializzazione:', error);
    document.querySelector('.content').innerHTML = `
      <h1>Errore nel caricamento</h1>
      <p>Aggiornare la pagina o controllare la connessione</p>
    `;
  }
});

window.addEventListener("resize", function () {
  changeBackgrounds();
});