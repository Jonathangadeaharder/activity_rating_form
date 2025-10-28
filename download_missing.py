#!/usr/bin/env python3
import requests

missing = [
    ('036_Patinaje_con_patines_de_4_ruedas.jpg', 'https://images.unsplash.com/photo-1551958219-acbc608c6c4d?w=400&h=250&fit=crop'),
    ('042_Escape_Room.jpg', 'https://images.unsplash.com/photo-1604143379728-0d5e0c33ebfc?w=400&h=250&fit=crop'),
    ('047_Salon_de_Arcades.jpg', 'https://images.unsplash.com/photo-1556438758-8d49568ce18e?w=400&h=250&fit=crop'),
]

for name, url in missing:
    try:
        print(f"Descargando {name}...", end=" ")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        with open(f'activity_images/{name}', 'wb') as f:
            f.write(response.content)
        print("✓")
    except Exception as e:
        print(f"✗ {e}")

print("\n¡Descarga completada!")
