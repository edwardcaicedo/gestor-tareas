const inputTitulo = document.querySelector('.pantalla');
const btnTarea = document.querySelector('.btnTarea');
const mensajes = document.querySelector('.mensajes');
const listaTarea = document.querySelector('.listaTarea');

// Dibuja UNA tarea en la lista
function mostrarTarea(tarea) {
    const li = document.createElement('li');
    li.textContent = tarea.titulo;
    li.dataset.id = tarea._id;
    listaTarea.append(li);
}

// Pide las tareas al servidor y las dibuja
async function cargarTareas() {
    try {
        const respuesta = await fetch('/tareas');

        if (!respuesta.ok) {
            mensajes.textContent = 'No se pudieron cargar las tareas';
            return;
        }

        const lista = await respuesta.json();
        listaTarea.innerHTML = '';

        if (lista.length === 0) {
            mensajes.textContent = 'No hay tareas';
            return;
        }

        lista.forEach(mostrarTarea);
    } catch (error) {
        mensajes.textContent = 'No se pudo conectar con el servidor';
    }
}

// Guarda una tarea nueva
btnTarea.addEventListener('click', async function () {
    const titulo = inputTitulo.value.trim();

    if (titulo === '') {
        mensajes.textContent = 'Escribe un título';
        mensajes.style.color = 'red';
        return;
    }

    try {
        const respuesta = await fetch('/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: titulo })
        });

        if (respuesta.ok) {
            inputTitulo.value = '';
            await cargarTareas();
            mensajes.textContent = 'Tarea guardada';
        } else {
            mensajes.textContent = 'No se pudo guardar';
        }
    } catch (error) {
        mensajes.textContent = 'No se pudo conectar con el servidor';
    }
});


cargarTareas();