
const inputTitulo = document.querySelector('.pantalla');
const btnTarea = document.querySelector('.btnTarea');
const mensajes = document.querySelector('.mensajes');
const listaTarea = document.querySelector('.listaTarea');
const listraTarea = document.querySelector('#listraTarea')

// Dibuja UNA tarea en la lista
function mostrarTarea(tarea) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    const btnModificar = document.createElement('button');
    btnModificar.textContent = 'Modificar';
    btnModificar.classList = 'btnTarea';
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList = 'btnEliminar'

    li.textContent = tarea.titulo;
    li.dataset.id = tarea._id;

    if(tarea.completada){
        span.textContent = '(completada)';
        tarea.completada = true;
        li.classList.add('completada');
    }else {
        tarea.completada = false;
        span.textContent = '(pendiente)';
    }

    btnEliminar.addEventListener('click', async function(){

        const aceptar = confirm('¿Eliminar esta tarea?');

        if (!aceptar) {
            return;
        }
        
        try {
            const respuesta = await fetch(`/tareas/${tarea._id}`, {method: 'DELETE'});

            if(respuesta.deletedCount === 0){
                alert('No se pudo eliminar la tarea')
            }

            if(respuesta.ok){
                await cargarTareas();
            }else {
                alert('No se pudo eliminar la tarea')
            }
        }catch(error){
            console.log('Error de conexion: ', error)
        }
    })


    span.addEventListener('dblclick', async function() {
        try {
            const respuesta = await fetch(`/tareas/${tarea._id}/estado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completada: !tarea.completada })
            });

            if(respuesta.ok){
                await cargarTareas();
            }else {
                alert('No se pudo cambiar el estado')
            }
        }catch(error){
            console.log('Error de conexion: ', error)
        }
  
    })
     
    

    btnModificar.addEventListener('click', async function(){
        console.log('clic en modificar', tarea.titulo);
        const nuevoTitulo = prompt('Escribe un nuevo titulo: ', tarea.titulo);
        
        if(nuevoTitulo !== null && nuevoTitulo.trim() !== ''){
            try {
                const respuesta = await fetch(`/tareas/${tarea._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ titulo: nuevoTitulo})
                });

                if(respuesta.ok){
                    tarea.titulo = nuevoTitulo.trim();
                    await cargarTareas();
                }else {
                    alert('No se pudo actualizar la tarea');
                }
            } catch(error){
                console.log('Error de conexion: ', error);
            }
        }

    })

    li.append(span, btnModificar, btnEliminar);
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
        setTimeout(() => {
            mensajes.textContent = ''
        }, 2000)
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