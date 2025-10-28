// ============================================================================
// CONFIGURATION - PASTE YOUR GOOGLE APPS SCRIPT URL HERE
// ============================================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycb7hJDvCduGK9t1nSWfUnbci1l1DVCKDgA5Ls3UnmxnDaVYz4gGB8O889J7DLlLp2/exec';
// Get this URL from: Google Apps Script → Deploy → New deployment → Web app
// ============================================================================

// Activities data organized by category with descriptions and images
const activities = {
    "Atracciones y Parques Temáticos": [
        {
            name: "Ópera",
            description: "Ópera Estatal de Berlín con producciones de ópera clásica y contemporánea",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Bundesarchiv_Bild_146-1998-011-07%2C_Berlin%2C_Deutsche_Staatsoper%2C_Zuschauerraum.jpg"
        },
        {
            name: "Filarmónica de Berlín",
            description: "Una de las mejores orquestas del mundo en su icónico edificio",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=250&fit=crop"
        },
        {
            name: "Teatro",
            description: "Obras de teatro, musicales y producciones teatrales en diversos teatros",
            image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"
        },
        {
            name: "Berlinale (Festival de Cine)",
            description: "Uno de los festivales de cine más prestigiosos del mundo, celebrado cada febrero",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop"
        },
        {
            name: "CTM Festival",
            description: "Festival de música electrónica experimental y arte sonoro",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop"
        },
        {
            name: "Transmediale",
            description: "Festival de arte digital y cultura de medios contemporáneos",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop"
        },
        {
            name: "Tanztage Berlin (Festival de Danza)",
            description: "Festival internacional de danza contemporánea con actuaciones innovadoras",
            image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=400&h=250&fit=crop"
        },
        {
            name: "British Shorts (Festival de Cortometrajes)",
            description: "Festival dedicado a cortometrajes británicos e internacionales",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop"
        },
        {
            name: "Circo de Navidad",
            description: "Espectáculo circense tradicional durante la temporada navideña",
            image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=250&fit=crop"
        },
        {
            name: "Lego-Land",
            description: "Parque temático con atracciones y construcciones de LEGO",
            image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=250&fit=crop"
        },
        {
            name: "Disneyland Paris",
            description: "El mágico parque temático de Disney, a pocas horas de Berlín",
            image: "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?w=400&h=250&fit=crop"
        },
        {
            name: "Parque de Atracciones",
            description: "Diversión con montañas rusas y atracciones para toda la familia",
            image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=250&fit=crop"
        },
        {
            name: "Aquadom & Sea Life",
            description: "Acuario con el cilindro de agua más grande del mundo y vida marina fascinante",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop"
        },
        {
            name: "Zoo Berlin",
            description: "Zoológico histórico en el centro de Berlín con especies de todo el mundo",
            image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=250&fit=crop"
        },
        {
            name: "Tierpark Berlin",
            description: "Parque zoológico más grande de Europa en el este de Berlín",
            image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=250&fit=crop"
        },
        {
            name: "Tropical Islands",
            description: "Paraíso tropical cubierto con playa, piscinas y selva artificial",
            image: "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=400&h=250&fit=crop"
        },
        {
            name: "Filmpark Babelsberg",
            description: "Parque temático de cine con sets de filmación y efectos especiales",
            image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop"
        }
    ],
    "Cultura y Espectáculos": [
        {
            name: "Drag-Show",
            description: "Espectáculos vibrantes y entretenidos de drag queens en los clubes de Berlín",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop"
        },
        {
            name: "Friedrichstadt-Palast",
            description: "Teatro de revistas con producciones espectaculares y efectos impresionantes",
            image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"
        },
        {
            name: "Silent Disco",
            description: "Fiesta con auriculares donde cada uno escucha su propia música",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=250&fit=crop"
        },
        {
            name: "Improvisationstheater",
            description: "Teatro de improvisación cómico e interactivo con el público",
            image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=250&fit=crop"
        }
    ],
    "Museos y Exposiciones": [
        {
            name: "Isla de los Museos",
            description: "Complejo de cinco museos de clase mundial con arte y antigüedades",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop"
        },
        {
            name: "Museo de la RDA",
            description: "Museo interactivo sobre la vida cotidiana en la Alemania del Este",
            image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=400&h=250&fit=crop"
        },
        {
            name: "Topografía del Terror",
            description: "Museo sobre el terror nazi y la historia del Tercer Reich",
            image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=400&h=250&fit=crop"
        },
        {
            name: "Museo de Historia Natural",
            description: "Museo con esqueletos de dinosaurios y colecciones de historia natural",
            image: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&h=250&fit=crop"
        },
        {
            name: "Museo de la Técnica",
            description: "Museo con aviones, trenes y tecnología histórica",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
        },
        {
            name: "Hamburger Bahnhof (Museo de Arte Contemporáneo)",
            description: "Antigua estación de tren convertida en museo de arte moderno",
            image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=250&fit=crop"
        },
        {
            name: "Museo de Videojuegos",
            description: "Historia interactiva de los videojuegos desde los años 70",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop"
        },
        {
            name: "Illuseum / Deja Vu Museum",
            description: "Museo de ilusiones ópticas y experiencias sensoriales",
            image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=250&fit=crop"
        },
        {
            name: "Samurai Museum",
            description: "Colección de armaduras y armas samurái auténticas",
            image: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=250&fit=crop"
        },
        {
            name: "Spionagemuseum",
            description: "Museo interactivo sobre espionaje durante la Guerra Fría",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
        },
        {
            name: "Urban Nation",
            description: "Museo de arte urbano y graffiti contemporáneo",
            image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=250&fit=crop"
        }
    ],
    "Actividades y Deporte": [
        {
            name: "Patinaje sobre hielo",
            description: "Pistas de hielo al aire libre en invierno, perfectas para patinar",
            image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=250&fit=crop"
        },
        {
            name: "Bouldering",
            description: "Escalada en roca sin arnés en paredes de boulder especializadas",
            image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=250&fit=crop"
        },
        {
            name: "Parque de Escalada",
            description: "Escalada con arnés en paredes altas y circuitos de aventura",
            image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=400&h=250&fit=crop"
        },
        {
            name: "Patinaje con patines de 4 ruedas",
            description: "Patinaje retro en pistas o al aire libre",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop"
        },
        {
            name: "Nadar",
            description: "Piscinas públicas y lagos para nadar en verano",
            image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop"
        },
        {
            name: "Bowling",
            description: "Pistas de bowling modernas para competir con amigos",
            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop"
        },
        {
            name: "Go-Kart",
            description: "Carreras de karts en pistas cubiertas y al aire libre",
            image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop"
        },
        {
            name: "Lasertag",
            description: "Juegos de combate táctico con pistolas láser en arenas especializadas",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop"
        },
        {
            name: "Paintball",
            description: "Combate táctico al aire libre con marcadoras de paintball",
            image: "https://images.unsplash.com/photo-1624948465027-6f9b51067557?w=400&h=250&fit=crop"
        },
        {
            name: "Escape Room",
            description: "Resuelve acertijos y escapa de habitaciones temáticas",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop"
        },
        {
            name: "Minigolf con Luz Negra",
            description: "Minigolf en ambientes fluorescentes con luz ultravioleta",
            image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=250&fit=crop"
        },
        {
            name: "Parque de Trampolines",
            description: "Parques cubiertos con trampolines y zonas de salto",
            image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=250&fit=crop"
        },
        {
            name: "Surf Indoor",
            description: "Practica surf en olas artificiales bajo techo",
            image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=250&fit=crop"
        },
        {
            name: "Juegos de Realidad Virtual (VR)",
            description: "Experiencias de realidad virtual inmersivas en centros especializados",
            image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=250&fit=crop"
        },
        {
            name: "Salón de Arcades",
            description: "Juegos arcade clásicos y modernos en salones recreativos",
            image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=250&fit=crop"
        },
        {
            name: "Trampolinpark 'Sprung Raum'",
            description: "Parque de trampolines con áreas de salto y acrobacias",
            image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop"
        },
        {
            name: "Bubble-Fußball",
            description: "Fútbol dentro de burbujas inflables gigantes",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop"
        }
    ],
    "Turismo": [
        {
            name: "Salsa",
            description: "Clases y fiestas de salsa en clubes latinos de Berlín",
            image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=250&fit=crop"
        },
        {
            name: "Bachata",
            description: "Clases y eventos de bachata con música caribeña",
            image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=250&fit=crop"
        },
        {
            name: "Barrio del Reichstag y visita al Parlamento",
            description: "Visita el edificio del parlamento alemán con su cúpula de cristal",
            image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop"
        },
        {
            name: "Torre de Televisión",
            description: "Icónica torre con vistas panorámicas de 360° de Berlín",
            image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&h=250&fit=crop"
        },
        {
            name: "Globo Aerostático",
            description: "Vuelo en globo cautivo con vistas espectaculares de la ciudad",
            image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop"
        },
        {
            name: "Paseo por el Camino del Muro / East Side Gallery",
            description: "Recorre la ruta histórica del Muro de Berlín y su galería de arte",
            image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=250&fit=crop"
        },
        {
            name: "Mauerpark",
            description: "Parque popular con mercadillo dominical y karaoke al aire libre",
            image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=250&fit=crop"
        },
        {
            name: "Mercado de Navidad (Weihnachtsmarkt)",
            description: "Mercados navideños tradicionales con comida, bebidas y artesanías",
            image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=250&fit=crop"
        },
        {
            name: "Palacio de Sanssouci (Potsdam)",
            description: "Magnífico palacio rococó con jardines espectaculares",
            image: "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=400&h=250&fit=crop"
        },
        {
            name: "Palacio de Charlottenburg",
            description: "El palacio más grande de Berlín con jardines barrocos",
            image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=400&h=250&fit=crop"
        },
        {
            name: "Isla de los Pavos Reales",
            description: "Isla tranquila con pavos reales y naturaleza en el río Havel",
            image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=250&fit=crop"
        },
        {
            name: "Berliner Unterwelten (Tours por el Subterráneo)",
            description: "Tours por búnkeres y túneles subterráneos históricos",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"
        },
        {
            name: "Senderismo / Paseo por el Bosque",
            description: "Rutas de senderismo en los bosques y parques de Berlín",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop"
        },
        {
            name: "Ku-Damm y Centros Comerciales",
            description: "Famosa avenida de compras con tiendas de lujo y boutiques",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop"
        },
        {
            name: "Mercado de Pulgas",
            description: "Mercados de antigüedades y objetos vintage los fines de semana",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=250&fit=crop"
        },
        {
            name: "París",
            description: "Escapada de fin de semana a la ciudad de la luz",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop"
        },
        {
            name: "Barcelona",
            description: "Viaje a la capital catalana con Gaudí y playas mediterráneas",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop"
        },
        {
            name: "Valencia",
            description: "Ciudad de las artes, las ciencias y la paella",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop"
        },
        {
            name: "Amsterdam",
            description: "Canales, museos y cultura en la capital holandesa",
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=250&fit=crop"
        },
        {
            name: "Marseille",
            description: "Puerto mediterráneo con cultura provenzal y bouillabaisse",
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"
        },
        {
            name: "Frankfurt",
            description: "Centro financiero con rascacielos y casco antiguo histórico",
            image: "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=400&h=250&fit=crop"
        }
    ],
    "Gastronomía y Vida Nocturna": [
        {
            name: "Comer Kebab",
            description: "Döner kebab, la comida callejera más popular de Berlín",
            image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=250&fit=crop"
        },
        {
            name: "Comer Currywurst",
            description: "Salchicha alemana con curry, un clásico berlinés desde 1949",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=250&fit=crop"
        },
        {
            name: "Markthalle Neun (Mercado de Street Food)",
            description: "Mercado cubierto con comida internacional y eventos gastronómicos",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop"
        },
        {
            name: "Bar de Karaoke",
            description: "Canta tus canciones favoritas en bares de karaoke animados",
            image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=250&fit=crop"
        },
        {
            name: "Club de Techno",
            description: "Clubes legendarios de techno como Berghain y Tresor",
            image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&h=250&fit=crop"
        },
        {
            name: "Fiesta Retro",
            description: "Fiestas temáticas con música de los 80s, 90s y 2000s",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop"
        },
        {
            name: "Show de Comedia en Español",
            description: "Stand-up comedy en español con comediantes internacionales",
            image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=250&fit=crop"
        }
    ],
    "Relax": [
        {
            name: "Sauna",
            description: "Saunas tradicionales alemanas y finlandesas para relajarse",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop"
        },
        {
            name: "Spa",
            description: "Spas con tratamientos de bienestar, masajes y piscinas termales",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop"
        },
        {
            name: "Bibliotecas",
            description: "Bibliotecas públicas modernas con espacios de lectura tranquilos",
            image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop"
        },
        {
            name: "Cine",
            description: "Cines con películas en versión original y estrenos internacionales",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop"
        },
        {
            name: "Simulador de Vuelo",
            description: "Experiencia realista de pilotaje en simuladores profesionales",
            image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=250&fit=crop"
        }
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
                <div class="activity-content">
                    <img src="${activity.image}" alt="${activity.name}" class="activity-image" loading="lazy">
                    <div class="activity-info">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-description">${activity.description}</div>
                    </div>
                </div>
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
            responses.ratings[activity.name] = selected ? parseInt(selected.value) : null;
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
    const allActivities = Object.values(activities).flat().map(a => a.name);
    
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
