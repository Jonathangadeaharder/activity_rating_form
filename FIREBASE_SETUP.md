# 🔥 Configuración de Firebase para Persistencia de Datos

Tu aplicación ahora está configurada para usar **Firebase Firestore** como base de datos en la nube.

## ✅ Lo que ya está hecho

- ✅ Configuración de Firebase en `firebase-config.js`
- ✅ Integración con Firestore en `script.js`
- ✅ Panel de administración actualizado en `admin.html`
- ✅ Fallback a localStorage si Firebase falla

## 🚀 Pasos para activar Firebase

### 1. Configurar reglas de Firestore

Ve a la [Consola de Firebase](https://console.firebase.google.com/) → Tu proyecto **survey-berlin** → Firestore Database → Reglas

Reemplaza las reglas con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura en la colección 'responses'
    match /responses/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **IMPORTANTE**: Estas reglas permiten acceso público. Para producción, deberías agregar autenticación.

### 2. Publicar las reglas

Haz clic en **"Publicar"** en la consola de Firebase.

### 3. Probar la aplicación

1. Abre `index.html` en un navegador
2. Completa una encuesta
3. Revisa la consola del navegador (F12) - deberías ver:
   ```
   ✅ Response saved to Firebase Firestore with ID: [document-id]
   ```
4. Ve a `admin.html` para ver las respuestas

## 📊 Ver datos en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **survey-berlin**
3. Click en **Firestore Database**
4. Verás la colección `responses` con todos los datos

## 🔒 Reglas de seguridad para producción

Para un entorno de producción, usa estas reglas más seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{document=**} {
      // Permitir escritura a todos (para enviar encuestas)
      allow create: if true;
      
      // Permitir lectura solo a usuarios autenticados (admin)
      allow read: if request.auth != null;
      
      // No permitir actualización o eliminación
      allow update, delete: if false;
    }
  }
}
```

## 🛠️ Solución de problemas

### Error: "permission-denied"
- Verifica que las reglas de Firestore estén publicadas
- Asegúrate de que permiten escritura en `/responses`

### Error: "Firebase not initialized"
- Verifica que `firebase-config.js` esté en la misma carpeta
- Asegúrate de que el servidor web esté corriendo (no abras el HTML directamente)

### Los datos no aparecen en admin.html
- Abre la consola del navegador (F12)
- Verifica si hay errores de Firebase
- Comprueba que las reglas permiten lectura

## 🌐 Servidor local requerido

Firebase requiere que la aplicación se ejecute desde un servidor web:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 📈 Ventajas de Firebase Firestore

- ✅ **Datos en tiempo real**: Múltiples usuarios pueden ver actualizaciones instantáneas
- ✅ **Escalable**: Soporta miles de usuarios simultáneos
- ✅ **Gratis**: 50,000 lecturas/día, 20,000 escrituras/día
- ✅ **Backup automático**: Tus datos están seguros en la nube
- ✅ **Acceso desde cualquier lugar**: No depende del navegador local

## 🔄 Migrar datos de localStorage a Firebase

Si ya tienes datos en localStorage, puedes migrarlos:

1. Abre la consola del navegador en `admin.html`
2. Ejecuta este código:

```javascript
async function migrateToFirebase() {
  const { db, collection, addDoc } = await import('./firebase-config.js');
  const localData = JSON.parse(localStorage.getItem('activityResponses') || '[]');
  
  for (const response of localData) {
    await addDoc(collection(db, 'responses'), response);
    console.log('Migrated:', response.name);
  }
  
  console.log('✅ Migration complete!');
}

migrateToFirebase();
```

## 📞 Soporte

Si tienes problemas, revisa:
- [Documentación de Firebase](https://firebase.google.com/docs/firestore)
- [Consola de Firebase](https://console.firebase.google.com/)
- La consola del navegador (F12) para ver errores

---

**¡Tu aplicación ahora tiene persistencia de datos en la nube! 🎉**
