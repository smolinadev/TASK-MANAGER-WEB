# ✅ Task Manager Web

App de gestión de tareas personal, construida con HTML, CSS y JavaScript puro. Sin frameworks, sin dependencias, sin registro.

## ¿Qué hace?

- Agregar tareas con nombre, prioridad y fecha límite
- Ordenar automáticamente por prioridad y fecha de vencimiento
- Colorear la fecha según urgencia — rojo si vence hoy, naranja si vence mañana
- Filtrar tareas por estado: todas, pendientes o completadas
- Marcar tareas como completadas
- Eliminar tareas
- Guardar todo en el navegador con `localStorage` — los datos persisten aunque cierres la pestaña o el navegador 

## Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage — almacenamiento local en el navegador

## Cómo usarla

1. Clona el repositorio
```bash
git clone https://github.com/smolinadev/TASK-MANAGER-WEB.git
```
2. Abre `index.html` con Live Server en VS Code o directamente en el navegador
3. No necesita instalación ni dependencias

## Estructura del proyecto

```
TASK-MANAGER-WEB/
├── index.html    # Estructura de la app
├── style.css     # Estilos y diseño responsive
├── app.js        # Lógica de la aplicación
└── favicon.ico   # Icono de la pestaña
```

## Funcionalidades detalladas

### Prioridades
Cada tarea tiene una prioridad asignada por el usuario:
- 🔴 **Alta** — aparece primero
- 🟠 **Media**
- 🟢 **Baja** — aparece al final

### Fecha límite
- Solo acepta fechas desde hoy hasta 45 días adelante
- La fecha se colorea automáticamente según urgencia
- Las tareas con fecha más próxima aparecen arriba dentro de su grupo de prioridad

### Almacenamiento
Los datos se guardan en `localStorage` del navegador. No se necesita servidor ni cuenta — las tareas persisten entre sesiones en el mismo dispositivo.

---

Proyecto desarrollado por Sebastian Molina como práctica de JavaScript vanilla.