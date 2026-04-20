# Generador de contenido Instagram · Farmacia

Aplicación web para generar posts, carruseles y stories para Instagram usando IA.

---

## Estructura del proyecto

```
farmacia-ig/
├── api/
│   └── generate.js     ← Backend (se ejecuta en Vercel, protege tu API key)
├── public/
│   └── index.html      ← Frontend (la interfaz web)
├── vercel.json         ← Configuración de Vercel
└── package.json
```

---

## Cómo desplegarlo en Vercel (paso a paso)

### Paso 1 — Crea una cuenta en GitHub
Ve a https://github.com y crea una cuenta gratuita si no tienes.

### Paso 2 — Sube el proyecto a GitHub
1. En GitHub, haz clic en "New repository"
2. Ponle nombre: `farmacia-ig`
3. Déjalo en "Public" y haz clic en "Create repository"
4. Verás instrucciones para subir archivos. Usa la opción "uploading an existing file"
5. Sube todos los archivos manteniendo la estructura de carpetas

### Paso 3 — Crea una cuenta en Vercel
Ve a https://vercel.com y regístrate con tu cuenta de GitHub (botón "Continue with GitHub").

### Paso 4 — Importa el proyecto en Vercel
1. En el dashboard de Vercel, haz clic en "Add New → Project"
2. Selecciona tu repositorio `farmacia-ig`
3. Haz clic en "Deploy" (sin cambiar nada más)

### Paso 5 — Añade tu API key de Anthropic
1. En Vercel, ve a tu proyecto → "Settings" → "Environment Variables"
2. Añade una nueva variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: tu API key (la consigues en https://console.anthropic.com)
3. Haz clic en "Save"
4. Ve a "Deployments" y haz clic en "Redeploy" para que coja la variable

### Paso 6 — ¡Listo!
Vercel te dará una URL tipo `farmacia-ig-xxx.vercel.app`. Esa es tu aplicación.
Guárdala en favoritos del móvil para tenerla siempre a mano.

---

## Cómo obtener tu API key de Anthropic

1. Ve a https://console.anthropic.com
2. Crea una cuenta (necesitas tarjeta de crédito, pero el uso es muy barato — céntimos por generación)
3. Ve a "API Keys" → "Create Key"
4. Copia la key y pégala en Vercel como se indica arriba

---

## Coste aproximado
Cada generación de contenido cuesta aproximadamente 0,01–0,03 € dependiendo de la longitud.
Para 20 generaciones a la semana, el coste mensual sería de menos de 3 €.
