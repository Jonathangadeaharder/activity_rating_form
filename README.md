# 🎭 Encuesta de Actividades en Berlín

Una aplicación web moderna y elegante para calificar actividades en Berlín del 1 al 5.

## 🚀 Características

- ✅ **Interfaz moderna y responsive** - Funciona en desktop, tablet y móvil
- ✅ **Entrada de nombre** - Los usuarios ingresan su nombre antes de comenzar
- ✅ **47 actividades organizadas por categorías**:
  - Atracciones y Parques Temáticos
  - Cultura y Espectáculos
  - Museos y Exposiciones
  - Actividades y Deporte
  - Turismo
  - Gastronomía y Vida Nocturna
  - Relax
- ✅ **Barra de progreso** - Muestra cuántas actividades han sido calificadas
- ✅ **Almacenamiento local** - Las respuestas se guardan en localStorage
- ✅ **Exportación a CSV** - Descarga todas las respuestas en formato CSV

## 📁 Archivos

- `index.html` - Estructura HTML de la aplicación
- `script.js` - Lógica JavaScript y datos de actividades
- `README.md` - Este archivo

## 🎯 Cómo usar

### Opción 1: Abrir directamente
1. Abre el archivo `index.html` en tu navegador web
2. Ingresa tu nombre
3. Califica cada actividad del 1 al 5
4. Haz clic en "Enviar Respuestas"

### Opción 2: Servidor local (recomendado)
```bash
# Navega a la carpeta
cd activity_rating_form

# Python 3
python -m http.server 8000

# O con Node.js (si tienes http-server instalado)
npx http-server -p 8000
```

Luego abre: `http://localhost:8000`

## 💾 Ver y exportar respuestas

### Ver respuestas en la consola del navegador:
```javascript
viewResponses()
```

### Exportar a CSV:
```javascript
exportToCSV()
```

O puedes agregar botones en el HTML para estas funciones.

## 🎨 Personalización

### Cambiar colores:
Edita las variables de gradiente en `index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Agregar/modificar actividades:
Edita el objeto `activities` en `script.js`:
```javascript
const activities = {
    "Tu Categoría": [
        "Actividad 1",
        "Actividad 2"
    ]
};
```

## 📊 Estructura de datos

Las respuestas se guardan en este formato:
```json
{
    "name": "Juan Pérez",
    "timestamp": "2025-10-28T22:00:00.000Z",
    "ratings": {
        "Ópera / Filarmónica / Teatro": 5,
        "Berlinale (Festival de Cine)": 4,
        ...
    }
}
```

## 🔒 Privacidad

- Todos los datos se almacenan localmente en el navegador
- No se envía información a ningún servidor
- Los datos persisten hasta que se limpie el localStorage del navegador

## 🛠️ Tecnologías

- HTML5
- CSS3 (Gradientes, Flexbox, Transiciones)
- JavaScript Vanilla (ES6+)
- LocalStorage API

## 📝 Licencia

Libre para uso personal y comercial.

---

**Creado con ❤️ para evaluar actividades en Berlín**
