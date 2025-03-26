document.addEventListener("DOMContentLoaded", function() {
  function initMap() {
    // Inizializza la mappa con il centro predefinito
    var center = { lat: 42.14944, lng: 11.93806 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: center,
      mapTypeId: 'roadmap'
    });

    // Punti di interesse
    const points = [
      { 
        name: "TEATRO CLAUDIO", 
        coords: { lat: 42.15025, lng: 11.93487 }, 
        info: "Via Teatro Claudio, 1"
      },
      {
        name: "LA ROCCA",
        coords: { lat: 42.15214183489226, lng: 11.944040910485032 },
        info: "Fortezza medievale"
      },
      {
        name: "COMUNE",
        coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
        info: "Municipio di Tolfa"
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
                  </div>`
      });

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
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