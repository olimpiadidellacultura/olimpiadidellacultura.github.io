document.addEventListener("DOMContentLoaded", function() {
  function initMap() {
    // Inizializza la mappa con il centro predefinito
    var center = { lat: 42.14944, lng: 11.93806 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: center,
      mapTypeId: 'roadmap'
    });

    // Carica il programma per arricchire i marker
    fetch('programma.json')
      .then(response => response.json())
      .then(data => {
        // Punti di interesse con attività associate
        const points = [
          { 
            name: "TEATRO CLAUDIO", 
            coords: { lat: 42.15025, lng: 11.93487 }, 
            info: "Via Teatro Claudio, 1",
            keywords: "🎭 Cerimonia apertura<br>🎬 Proiezione corti<br>🎤 Prova talento<br>🕺 Battle"
          },
          {
            name: "POLO CULTURALE",
            coords: { lat: 42.14987940358026, lng: 11.930005844754685 },
            info: "Polo Culturale di Tolfa",
            keywords: "🎓 Prova 'Parlateci di'"
          },
          {
            name: "PIAZZA V.VENETO",
            coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
            info: "-Staffetta della Cultura-",
            keywords: "📚 Staffetta della Cultura<br>🏐 Volleympiadi<br>🏃 Riscaldamento"
          },
          {
            name: "GIARDINO DELLA VILLA COMUNALE",
            coords: { lat: 42.14862519500307, lng: 11.936753508337052 },
            info: "Registrazione",
            keywords: "✅ Accoglienza e registrazione<br>🎲 Sorteggio prove"
          }
        ];

        // Aggiungi marker
        points.forEach(point => {
          var marker = new google.maps.Marker({
            position: point.coords,
            map: map,
            title: point.name
          });

          var infoWindow = new google.maps.InfoWindow({
            content: `<div class="map-popup" style="color: black;">
                          <h6 style="color: black; font-weight: bold;">${point.name}</h6>
                          <p style="color: black;">${point.info}</p>
                          <div class="activities-box" style="margin: 8px 0; padding: 8px; background-color: #f8f9fa; border-radius: 4px; color: black;">
                            <strong style="color: black;">Attività:</strong><br>
                            <span style="color: black;">${point.keywords.replace(/🎭|🎬|🎤|🕺|🎓|📚|🏐|🏃|✅|🎲/g, match => {
                              // Mappa emoji a icone SVG disponibili nella cartella icons/
                              const iconMap = {
                                '🎭': '<img src="icons/clear-day.svg" alt="Cerimonia" width="16" height="16" style="margin-right: 4px;">',
                                '🎬': '<img src="icons/partly-cloudy-day.svg" alt="Proiezione" width="16" height="16" style="margin-right: 4px;">',
                                '🎤': '<img src="icons/thunderstorms.svg" alt="Talento" width="16" height="16" style="margin-right: 4px;">',
                                '🕺': '<img src="icons/thunderstorms-rain.svg" alt="Battle" width="16" height="16" style="margin-right: 4px;">',
                                '🎓': '<img src="icons/cloudy.svg" alt="Prova" width="16" height="16" style="margin-right: 4px;">',
                                '📚': '<img src="icons/partly-cloud-day.svg" alt="Staffetta" width="16" height="16" style="margin-right: 4px;">',
                                '🏐': '<img src="icons/clear-day.svg" alt="Volley" width="16" height="16" style="margin-right: 4px;">',
                                '🏃': '<img src="icons/fog.svg" alt="Riscaldamento" width="16" height="16" style="margin-right: 4px;">',
                                '✅': '<img src="icons/drizzle.svg" alt="Registrazione" width="16" height="16" style="margin-right: 4px;">',
                                '🎲': '<img src="icons/snow.svg" alt="Sorteggio" width="16" height="16" style="margin-right: 4px;">'
                              };
                              return iconMap[match] || match;
                            })}</span>
                          </div>
                          <a href="geo:${point.coords.lat},${point.coords.lng}" 
                             class="btn btn-sm btn-primary">
                             <img src="icons/rain.svg" alt="Naviga" width="16" height="16" style="margin-right: 4px;"> Naviga
                          </a>
                      </div>`
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
          });
        });
      })
      .catch(err => {
        console.error('Errore nel caricamento del programma:', err);
        // Fallback se il caricamento del programma fallisce
        const points = [
          { 
            name: "TEATRO CLAUDIO", 
            coords: { lat: 42.15025, lng: 11.93487 }, 
            info: "Via Teatro Claudio, 1"
          },
          {
            name: "POLO CULTURALE",
            coords: { lat: 42.14987940358026, lng: 11.930005844754685 },
            info: "Polo Culturale di Tolfa"
          },
          {
            name: "PIAZZA V.VENETO",
            coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
            info: "-Staffetta della Cultura-"
          },
          {
            name: "GIARDINO DELLA VILLA COMUNALE",
            coords: { lat: 42.14862519500307, lng: 11.936753508337052 },
            info: "Registrazione"
          }
        ];

        // Aggiungi marker
        points.forEach(point => {
          var marker = new google.maps.Marker({
            position: point.coords,
            map: map,
            title: point.name
          });

          var infoWindow = new google.maps.InfoWindow({
            content: `<div class="map-popup">
                          <h6>${point.name}</h6>
                          <p>${point.info}</p>
                          <a href="https://www.google.com/maps/dir/?api=1&destination=${point.coords.lat},${point.coords.lng}" 
                             target="_blank" class="btn btn-sm btn-primary">
                             ➡️
                          </a>
                      </div>`
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
          });
        });
      });
  }

  window.initMap = initMap;

  function showProgram(day) {
    fetch('programma.json')
      .then(response => response.json())
      .then(data => {
        const program = data.programma.filter(item => item.data === day);
        let programHtml = `<h3>${day}</h3>`;
        program.forEach(event => {
          programHtml += `<p><strong style="color: #33AEFF;">${event.ora}</strong><br>${event.attivita}${event.luogo ? `<br><span style="font-weight: 600; color: #ff9d00;">Presso:</span> ${event.luogo}` : ''}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgram = showProgram;

  function showProgramPT() {
    fetch('programma-pt.json')
      .then(response => response.json())
      .then(data => {
        let programHtml = `<h3>Prova Talento</h3>`;
        data.programma.forEach((event, index) => {
          programHtml += `<p><strong style="color: #33AEFF;">Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgramPT = showProgramPT;

  function showProgramPD() {
    fetch('programma-pd.json')
      .then(response => response.json())
      .then(data => {
        let programHtml = `<h3>Parlateci di...</h3>`;
        data.programma.forEach((event, index) => {
          programHtml += `<p><strong style="color: #33AEFF;">Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgramPD = showProgramPD;

});