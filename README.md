# Bio Eneagrama — Vero Gil

Herramienta web de autoconocimiento basada en el Eneagrama.

## Archivos principales

| Archivo | Función |
|---|---|
| `index.html` | Landing page pública |
| `test.html` | Test de 180 afirmaciones |
| `cuestionario.html` | Cuestionario de 15 preguntas |
| `lectura.html` | Panel profesional (acceso por PIN) |

## Deploy en GitHub + Vercel

### 1. Crear repositorio en GitHub
1. Ir a github.com → New repository
2. Nombre: `bioeneagrama` (o el que prefieras)
3. Público o privado, sin inicializar

### 2. Subir el código
```bash
git init
git add .
git commit -m "feat: Bio Eneagrama - versión inicial completa"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bioeneagrama.git
git push -u origin main
```

### 3. Conectar Vercel
1. Ir a vercel.com → New Project
2. Importar el repositorio de GitHub
3. Framework: Other (sin build)
4. Click Deploy

La URL pública quedará: `https://bioeneagrama.vercel.app` (o similar)

## Cambiar PIN de lectura profunda

Editá la constante en `js/data.js`:
```js
const PIN_LECTURA = "2408";  // ← cambiá este valor
```

## Cambiar número de WhatsApp

Editá la constante en `js/data.js`:
```js
const WA_NUMBER = "5491149169532";  // ← formato internacional sin +
```

## Flujo de uso

1. **Usuario** → accede a `index.html` → hace el test gratuito
2. Al terminar → comparte resultados por WhatsApp con Vero
3. El mensaje incluye un link a `lectura.html` con los scores codificados
4. **Vero** → abre el link → ingresa PIN `2408` → ve la lectura profunda completa
5. Si no tiene el link → entra a `lectura.html` directamente → ingresa PIN → carga los scores manualmente

## Notas técnicas

- Sin frameworks, sin npm, sin build — HTML/CSS/JS puro
- Mobile-first, funciona en cualquier navegador moderno
- `lectura.html` no aparece en ningún menú público
