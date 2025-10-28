#!/usr/bin/env python3
import os
import requests
import json
import re
from pathlib import Path

# Create activity_images directory
os.makedirs('activity_images', exist_ok=True)

# Activities data with images
activities = {
    "Atracciones y Parques Temáticos": [
        ("Ópera", "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=250&fit=crop"),
        ("Filarmónica de Berlín", "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=250&fit=crop"),
        ("Teatro", "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"),
        ("Berlinale (Festival de Cine)", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop"),
        ("CTM Festival", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop"),
        ("Transmediale", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop"),
        ("Tanztage Berlin (Festival de Danza)", "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=400&h=250&fit=crop"),
        ("British Shorts (Festival de Cortometrajes)", "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop"),
        ("Circo de Navidad", "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=250&fit=crop"),
        ("Lego-Land", "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=250&fit=crop"),
        ("Disneyland Paris", "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?w=400&h=250&fit=crop"),
        ("Parque de Atracciones", "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=250&fit=crop"),
        ("Aquadom & Sea Life", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop"),
        ("Zoo Berlin", "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=250&fit=crop"),
        ("Tierpark Berlin", "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=250&fit=crop"),
        ("Tropical Islands", "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=400&h=250&fit=crop"),
        ("Filmpark Babelsberg", "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop"),
    ],
    "Cultura y Espectáculos": [
        ("Drag-Show", "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop"),
        ("Friedrichstadt-Palast", "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop"),
        ("Silent Disco", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=250&fit=crop"),
        ("Improvisationstheater", "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=250&fit=crop"),
    ],
    "Museos y Exposiciones": [
        ("Isla de los Museos", "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop"),
        ("Museo de la RDA", "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=400&h=250&fit=crop"),
        ("Topografía del Terror", "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=400&h=250&fit=crop"),
        ("Museo de Historia Natural", "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&h=250&fit=crop"),
        ("Museo de la Técnica", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"),
        ("Hamburger Bahnhof (Museo de Arte Contemporáneo)", "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=250&fit=crop"),
        ("Museo de Videojuegos", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop"),
        ("Illuseum / Deja Vu Museum", "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=250&fit=crop"),
        ("Samurai Museum", "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=250&fit=crop"),
        ("Spionagemuseum", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"),
        ("Urban Nation", "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=250&fit=crop"),
    ],
    "Actividades y Deporte": [
        ("Patinaje sobre hielo", "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=250&fit=crop"),
        ("Bouldering", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=250&fit=crop"),
        ("Parque de Escalada", "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=400&h=250&fit=crop"),
        ("Patinaje con patines de 4 ruedas", "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop"),
        ("Nadar", "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop"),
        ("Bowling", "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop"),
        ("Go-Kart", "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=250&fit=crop"),
        ("Lasertag", "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop"),
        ("Paintball", "https://images.unsplash.com/photo-1624948465027-6f9b51067557?w=400&h=250&fit=crop"),
        ("Escape Room", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop"),
        ("Minigolf con Luz Negra", "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=250&fit=crop"),
        ("Parque de Trampolines", "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=250&fit=crop"),
        ("Surf Indoor", "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=250&fit=crop"),
        ("Juegos de Realidad Virtual (VR)", "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=250&fit=crop"),
        ("Salón de Arcades", "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=250&fit=crop"),
        ("Trampolinpark 'Sprung Raum'", "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop"),
        ("Bubble-Fußball", "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop"),
    ],
    "Turismo": [
        ("Salsa", "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=250&fit=crop"),
        ("Bachata", "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=250&fit=crop"),
        ("Barrio del Reichstag y visita al Parlamento", "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop"),
        ("Torre de Televisión", "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&h=250&fit=crop"),
        ("Globo Aerostático", "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop"),
        ("Paseo por el Camino del Muro / East Side Gallery", "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=250&fit=crop"),
        ("Mauerpark", "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=250&fit=crop"),
        ("Mercado de Navidad (Weihnachtsmarkt)", "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400&h=250&fit=crop"),
        ("Palacio de Sanssouci (Potsdam)", "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=400&h=250&fit=crop"),
        ("Palacio de Charlottenburg", "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=400&h=250&fit=crop"),
        ("Isla de los Pavos Reales", "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=250&fit=crop"),
        ("Berliner Unterwelten (Tours por el Subterráneo)", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"),
        ("Senderismo / Paseo por el Bosque", "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop"),
        ("Ku-Damm y Centros Comerciales", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop"),
        ("Mercado de Pulgas", "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=250&fit=crop"),
        ("París", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop"),
        ("Barcelona", "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop"),
        ("Valencia", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop"),
        ("Amsterdam", "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=250&fit=crop"),
        ("Marseille", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop"),
        ("Frankfurt", "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=400&h=250&fit=crop"),
    ],
    "Gastronomía y Vida Nocturna": [
        ("Comer Kebab", "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=250&fit=crop"),
        ("Comer Currywurst", "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=250&fit=crop"),
        ("Markthalle Neun (Mercado de Street Food)", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop"),
        ("Bar de Karaoke", "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=250&fit=crop"),
        ("Club de Techno", "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&h=250&fit=crop"),
        ("Fiesta Retro", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop"),
        ("Show de Comedia en Español", "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=250&fit=crop"),
    ],
    "Relax": [
        ("Sauna", "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop"),
        ("Spa", "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop"),
        ("Bibliotecas", "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop"),
        ("Cine", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop"),
        ("Simulador de Vuelo", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=250&fit=crop"),
    ]
}

# Download all images
count = 0
failed = []

for category, items in activities.items():
    for name, url in items:
        count += 1
        # Create safe filename
        safe_name = re.sub(r'[<>:"/\\|?*]', '_', name)
        filename = f"{count:03d}_{safe_name}.jpg"
        filepath = os.path.join('activity_images', filename)
        
        try:
            print(f"Descargando {count}/95: {name}...", end=" ")
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print("✓")
        except Exception as e:
            print(f"✗ Error: {e}")
            failed.append((name, url, str(e)))

print(f"\n{'='*60}")
print(f"Descarga completada: {count - len(failed)}/{count} imágenes")
if failed:
    print(f"\nFallaron {len(failed)} descargas:")
    for name, url, error in failed:
        print(f"  - {name}: {error}")
else:
    print("¡Todas las imágenes se descargaron exitosamente!")
