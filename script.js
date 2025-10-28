// ============================================================================
// CONFIGURATION - PASTE YOUR GOOGLE APPS SCRIPT URL HERE
// ============================================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycb7hJDvCduGK9t1nSWfUnbci1l1DVCKDgA5Ls3UnmxnDaVYz4gGB8O889J7DLlLp2/exec';
// Get this URL from: Google Apps Script → Deploy → New deployment → Web app
// ============================================================================

// Activities data organized by category
const activities = {
    "Atracciones y Parques Temáticos": [
        "Ópera / Filarmónica / Teatro",
        "Berlinale (Festival de Cine)",
        "CTM & Transmediale (Festivales de Arte y Música)",
        "Tanztage Berlin (Festival de Danza)",
        "British Shorts (Festival de Cortometrajes)",
        "Circo de Navidad",
        "Lego-Land",
        "Disneyland Paris",
        "Parque de Atracciones",
        "Aquadom & Sea Life",
        "Zoo Berlin / Tierpark",
        "Tropical Islands",
        "Filmpark Babelsberg"
    ],
    "Cultura y Espectáculos": [
        "Drag-Show",
        "Friedrichstadt-Palast",
        "Silent Disco",
        "Improvisationstheater"
    ],
    "Museos y Exposiciones": [
        "Isla de los Museos",
        "Museo de la RDA",
        "Topografía del Terror",
        "Museo de Historia Natural",
        "Museo de la Técnica",
        "Hamburger Bahnhof (Museo de Arte Contemporáneo)",
        "Museo de Videojuegos",
        "Illuseum / Deja Vu Museum",
        "Samurai Museum",
        "Spionagemuseum",
        "Urban Nation"
    ],
    "Actividades y Deporte": [
        "Patinaje sobre hielo",
        "Bouldering / Parque de Escalada",
        "Patinaje con patines de 4 ruedas",
        "Nadar",
        "Bowling (Bolos)",
        "Go-Kart",
        "Lasertag / Paintball",
        "Escape Room",
        "Minigolf con Luz Negra",
        "Parque de Trampolines",
        "Surf Indoor",
        "Juegos de Realidad Virtual / Salón de Arcades",
        "Trampolinpark 'Sprung Raum'",
        "Bubble-Fußball"
    ],
    "Turismo": [
        "Salsa / Bachata",
        "Barrio del Reichstag y visita al Parlamento",
        "Torre de Televisión",
        "Globo Aerostático",
        "Paseo por el Camino del Muro",
        "Palacio de Sanssouci (Potsdam)",
        "Palacio de Charlottenburg",
        "Isla de los Pavos Reales",
        "Berliner Unterwelten (Tours por el Subterráneo)",
        "Senderismo / Paseo por el Bosque",
        "Ku-Damm y Centros Comerciales",
        "Mercado de Pulgas"
    ],
    "Gastronomía y Vida Nocturna": [
        "Comer Kebab / Currywurst",
        "Markthalle Neun (Mercado de Street Food)",
        "Bar de Karaoke",
        "Club de Techno / Fiesta Retro",
        "Show de Comedia en Español"
    ],
    "Relax": [
        "Sauna / Spa",
        "Bibliotecas",
        "Cine",
        "Simulador de Vuelo"
    ]
};

let userName = '';
let responses = {};

// Generate activity items
function generateActivities() {
    const form = document.getElementById('ratingForm');
    form.innerHTML = '';
    
    let activityIndex = 0;
    
    for (const [category, items] of Object.entries(activities)) {
        // Add category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = category;
        form.appendChild(categoryHeader);
        
        // Add activities in this category
        items.forEach(activity => {
            const activityDiv = document.createElement('div');
            activityDiv.className = 'activity-item';
            activityDiv.innerHTML = `
                <div class="activity-name">${activity}</div>
                <div class="rating-container">
                    ${[1, 2, 3, 4, 5].map(rating => `
                        <div class="rating-option">
                            <input type="radio" 
                                   id="activity_${activityIndex}_${rating}" 
                                   name="activity_${activityIndex}" 
                                   value="${rating}"
                                   onchange="updateProgress()">
                            <label for="activity_${activityIndex}_${rating}">${rating}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            form.appendChild(activityDiv);
            activityIndex++;
        });
    }
}

// Start rating process
function startRating() {
    const nameInput = document.getElementById('userName');
    userName = nameInput.value.trim();
    
    if (!userName) {
        alert('Por favor, ingresa tu nombre');
        nameInput.focus();
        return;
    }
    
    document.getElementById('nameSection').style.display = 'none';
    document.getElementById('activitiesSection').classList.add('active');
    
    generateActivities();
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const totalActivities = Object.values(activities).flat().length;
    const answeredActivities = document.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answeredActivities / totalActivities) * 100;
    
    document.getElementById('progressFill').style.width = progress + '%';
}

// Submit form
function submitForm() {
    const totalActivities = Object.values(activities).flat().length;
    const answeredActivities = document.querySelectorAll('input[type="radio"]:checked').length;
    
    if (answeredActivities < totalActivities) {
        const unanswered = totalActivities - answeredActivities;
        if (!confirm(`Tienes ${unanswered} actividades sin calificar. ¿Deseas enviar de todos modos?`)) {
            return;
        }
    }
    
    // Collect responses
    responses = { name: userName, ratings: {} };
    let activityIndex = 0;
    
    for (const [category, items] of Object.entries(activities)) {
        items.forEach(activity => {
            const selected = document.querySelector(`input[name="activity_${activityIndex}"]:checked`);
            responses.ratings[activity] = selected ? parseInt(selected.value) : null;
            activityIndex++;
        });
    }
    
    // Save response
    saveResponse(responses);
    
    // Show success message
    document.getElementById('activitiesSection').classList.remove('active');
    document.getElementById('successMessage').classList.add('active');
    document.getElementById('thankYouMessage').textContent = 
        `${userName}, tus respuestas han sido guardadas. ¡Gracias por tu tiempo!`;
}

// Save response to Google Sheets AND localStorage (fallback)
async function saveResponse(response) {
    response.timestamp = new Date().toISOString();
    
    // Always save to localStorage as backup
    const localResponses = JSON.parse(localStorage.getItem('activityResponses') || '[]');
    localResponses.push(response);
    localStorage.setItem('activityResponses', JSON.stringify(localResponses));
    
    // Try to save to Google Sheets
    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbycb7hJDvCduGK9t1nSWfUnbci1l1DVCKDgA5Ls3UnmxnDaVYz4gGB8O889J7DLlLp2/exec') {
        try {
            const result = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response)
            });
            
            console.log('✅ Response saved to Google Sheets');
        } catch (error) {
            console.error('❌ Error saving to Google Sheets:', error);
            console.log('✅ Response saved to localStorage as fallback');
        }
    } else {
        console.log('ℹ️ Google Sheets not configured. Response saved to localStorage only.');
        console.log('To enable Google Sheets: Update GOOGLE_SCRIPT_URL at the top of this file');
    }
}

// Reset form
function resetForm() {
    userName = '';
    responses = {};
    document.getElementById('userName').value = '';
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('nameSection').style.display = 'block';
    document.getElementById('progressFill').style.width = '0%';
}

// View all responses (admin function - works with localStorage)
function viewResponses() {
    const responses = JSON.parse(localStorage.getItem('activityResponses') || '[]');
    console.table(responses);
    return responses;
}

// Export responses as CSV
function exportToCSV() {
    const responses = JSON.parse(localStorage.getItem('activityResponses') || '[]');
    
    if (responses.length === 0) {
        alert('No hay respuestas para exportar');
        return;
    }
    
    // Get all unique activities
    const allActivities = Object.values(activities).flat();
    
    // Create CSV header
    let csv = 'Nombre,Fecha,' + allActivities.join(',') + '\n';
    
    // Add data rows
    responses.forEach(response => {
        const row = [
            `"${response.name}"`,
            new Date(response.timestamp).toLocaleString(),
            ...allActivities.map(activity => response.ratings[activity] || '')
        ];
        csv += row.join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'respuestas_actividades.csv';
    a.click();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Allow Enter key to start rating
    document.getElementById('userName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startRating();
        }
    });
    
    // Check if Google Sheets is configured
    if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbycb7hJDvCduGK9t1nSWfUnbci1l1DVCKDgA5Ls3UnmxnDaVYz4gGB8O889J7DLlLp2/exec') {
        console.log('⚠️ Google Sheets integration not configured');
        console.log('📝 Responses will be saved to localStorage only');
        console.log('💡 See DEPLOYMENT_GUIDE.md for setup instructions');
    }
});
