document.addEventListener("DOMContentLoaded", function() {
    fetch('programma-pt.json')
      .then(response => response.json())
      .then(data => {
        // Costruisci l'HTML della tabella con limiti e scrolling
        let tableHTML = `
        <div class="programma-pt-table shadow-lg rounded">
          <!-- Aggiungo overflow-auto e max-height per abilitare lo scrolling -->
          <div class="table-responsive overflow-auto" style="max-height: 500px;">
            <table class="table table-striped table-hover align-middle mb-0">
              <thead class="table-dark">
                <tr>
                  <th scope="col">DATA</th>
                  <th scope="col">SQUADRA</th>
                  <th scope="col">Ora</th>
                </tr>
              </thead>
              <tbody>`;
        
        data["programma"].forEach(item => {
          tableHTML += `
                <tr>
                  <td class="fw-bold">${item.data}</td>
                  <td>${item.squadra}</td>
                  <td>${item.ora}</td>
                </tr>`;
        });
        
        tableHTML += `
              </tbody>
            </table>
          </div>
        </div>`;
        
        document.getElementById('programma-pt-content').innerHTML = tableHTML;
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  });
  