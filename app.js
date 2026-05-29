
// nueva constante para mantener valores en el navegador con localStorage
const stored = localStorage.getItem('tasks');
let tasks = stored ? JSON.parse(stored) : [];

// Contador para asignar IDs únicos a nuevas tareas
let nextId = 4;
function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filtro actual ("todas" | "pendientes" | "completadas")
let currentFilter = "todas";


// ===========================
// MOSTRAR FECHA
// ===========================

function showDate() {
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const d = new Date();
  const label = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  document.getElementById("date-label").textContent = label;
}


// ===========================
// RENDERIZAR TAREAS
// ===========================

// Esta función lee el array `tasks`, aplica el filtro activo
// y vuelve a dibujar toda la lista en pantalla.
function render() {
  // 1. Filtrar según el botón activo
  tasks.sort(function(a,b){
    const peso= {alta: 1 , media: 2 , baja: 3}
    return peso[a.priority]- peso[b.priority];
  });


  const visible = tasks.filter(function(task) {
    if (currentFilter === "pendientes")  return !task.done;
    if (currentFilter === "completadas") return task.done;
    return true; // "todas"
  });

  // 2. Actualizar las estadísticas
  const doneCount = tasks.filter(function(t) { return t.done; }).length;
  document.getElementById("stat-total").textContent   = tasks.length;
  document.getElementById("stat-pending").textContent = tasks.length - doneCount;
  document.getElementById("stat-done").textContent    = doneCount;

  // 3. Obtener el contenedor de la lista
  const list = document.getElementById("task-list");

  // 4. Si no hay tareas visibles, mostrar mensaje vacío
  if (visible.length === 0) {
    list.innerHTML = '<div class="empty">No hay tareas aquí todavía.</div>';
    return;
  }

  // 5. Construir el HTML de cada tarjeta y unirlo
  list.innerHTML = visible.map(function(task) {
    // Determinar si el checkbox va marcado
    const checkedClass = task.done ? "checked" : "";
    const checkIcon    = task.done ? '<span class="checkmark">✓</span>' : "";
    const doneClass    = task.done ? "done" : "";

    // Capitalizar la primera letra de la prioridad para el badge
    const priorityText = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    return `
      <div class="task-card ${doneClass}">
        <div class="checkbox ${checkedClass}" data-id="${task.id}">
          ${checkIcon}
        </div>
        <div class="task-info">
          <span class="task-name">${task.name}</span>
        </div>
        <span class="priority-badge p-${task.priority}">${priorityText}</span>
        <button class="delete-btn" data-id="${task.id}">✕</button>
      </div>
    `;
  }).join("");

  // 6. Agregar eventos a los checkboxes y botones de eliminar
  attachTaskEvents();
}


// ===========================
// AGREGAR TAREA
// ===========================

function addTask() {
  // Leer el valor del input
  const input = document.getElementById("task-input");
  const name  = input.value.trim();

  // No hacer nada si el input está vacío
  if (!name) return;

  // Leer prioridad seleccionada
  const priority = document.getElementById("priority-select").value;

  // Crear la nueva tarea y agregarla al inicio del array
  const newTask = {
    id:       nextId++,
    name:     name,
    priority: priority,
    done:     false
  };

  tasks.unshift(newTask); // unshift agrega al inicio (como push pero al frente)

  // Limpiar el input
  input.value = "";

  save ();

  // Redibujar
  render();
}


// ===========================
// COMPLETAR / DESCOMPLETAR
// ===========================

function toggleTask(id) {
  // Buscar la tarea por id
  const task = tasks.find(function(t) { return t.id === id; });

  // Cambiar su estado
  if (task) {
    task.done = !task.done;
  }

  save();

  render();
}


// ===========================
// ELIMINAR TAREA
// ===========================

function deleteTask(id) {
  // findIndex devuelve la posición en el array
  const index = tasks.findIndex(function(t) { return t.id === id; });

  // splice elimina 1 elemento en esa posición
  if (index !== -1) {
    tasks.splice(index, 1);
  }

  save();

  render();
}


// ===========================
// FILTRAR TAREAS
// ===========================

function setFilter(filterValue, clickedBtn) {
  currentFilter = filterValue;

  // Quitar la clase "active" de todos los botones de filtro
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function(btn) {
    btn.classList.remove("active");
  });

  // Agregar "active" solo al botón clickeado
  clickedBtn.classList.add("active");

  render();
}


// ===========================
// EVENTOS DE LAS TARJETAS
// (se asignan luego de renderizar)
// ===========================

function attachTaskEvents() {
  // Checkboxes
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(function(box) {
    box.addEventListener("click", function() {
      const id = parseInt(box.getAttribute("data-id"));
      toggleTask(id);
    });
  });

  // Botones de eliminar
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      const id = parseInt(btn.getAttribute("data-id"));
      deleteTask(id);
    });
  });
}


// ===========================
// INICIALIZACIÓN
// (se ejecuta al cargar la página)
// ===========================

// Mostrar la fecha actual
showDate();

// Botón de agregar
document.getElementById("add-btn").addEventListener("click", addTask);

// Presionar Enter en el input también agrega la tarea
document.getElementById("task-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Botones de filtro
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const filterValue = btn.getAttribute("data-filter");
    setFilter(filterValue, btn);
  });
});

// Primer render para mostrar las tareas iniciales
render();
