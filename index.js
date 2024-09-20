// Función para mostrar la fecha actual
function mostrarFecha() {
    // Crear un objeto de la fecha actual
    let fechaActual = new Date();

    // Obtener el día actual
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1; // Los meses empiezan en 0
    let añoActual = fechaActual.getFullYear();

    // Mostrar la fecha en el elemento con id="fecha"
    document.getElementById('fecha').innerText = `Fecha: ${diaActual}/${mesActual}/${añoActual}`;
}

// Ejecutar la función cuando la página haya cargado completamente
window.onload = mostrarFecha;
