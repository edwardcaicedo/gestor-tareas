## Lo que aprendí

- **Separar el código por responsabilidades.** En este proyecto puse rutas y acceso a MongoDB en un solo archivo, mientras que en `hospital-api` los separé en rutas, controladores y servicios. Aprendí cuándo sirve cada enfoque: uno solo para algo pequeño, capas cuando el proyecto crece.
- **Dónde llega cada dato en Express.** El id viaja en la dirección y se lee con `req.params`; el título y el estado viajan en el cuerpo de la petición y se leen con `req.body`.
- **Construir la interfaz desde JavaScript.** Cada tarea se crea con `createElement`, se le asignan clases con `classList` y se le conectan eventos como el clic y el doble clic, usando `if` para decidir qué hacer según el estado.


# Product Backlog

| # | Historia de usuario | Criterios de aceptación | Prioridad | Estado |
|---|---|---|---|---|
| 1 | Como usuario, quiero crear una tarea con un título para anotar lo que debo hacer. | No permite títulos vacíos. La tarea nueva queda pendiente. | Alta | Sprint 1 |
| 2 | Como usuario, quiero ver la lista de mis tareas para saber qué me falta. | Muestra título y estado. Si no hay tareas, muestra un mensaje. | Alta | Sprint 1 |
| 3 | Como usuario, quiero marcar una tarea como completada para llevar el control de mi avance. | La tarea cambia de estado y se ve distinta (tachada). | Alta | Sprint 2 |
| 4 | Como usuario, quiero eliminar una tarea para quitar las que escribí mal o ya no necesito. | Pide confirmación antes de borrar. Si se cancela, se conserva. | Media | Sprint 3 |
| 5 | Como usuario, quiero modificar el título de una tarea para corregir errores sin borrarla. | No permite títulos vacíos. El cambio se ve al guardar. | Media | Sprint 2 |
| 6 | Como usuario, quiero desmarcar una tarea completada para retomarla. | La tarea vuelve a pendiente. | Media | Sprint 2 |
| 7 | Como usuario, quiero ver solo las tareas completadas para revisar lo que terminé. | Hay un filtro que se puede quitar. | Media | Pendiente |
| 8 | Como usuario, quiero ver el total de tareas, completadas y pendientes para saber cuánto me falta. | Los números se actualizan al crear, completar o eliminar. | Baja | Pendiente |