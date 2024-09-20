// Función para mostrar la fecha actual
function mostrarFecha() {
    // Crear un objeto de la fecha actual
    let fechaActual = new Date();

    // Obtener el día actual
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1; // Los meses empiezan en 0
    let añoActual = fechaActual.getFullYear();

    // Obtener el día de la semana
    let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let diaSemana = diasSemana[fechaActual.getDay()]; // Día de la semana en texto

    // Mostrar la fecha en el elemento con id="fecha"
    document.getElementById('fecha').innerText = `Hoy es ${diaSemana}, ${diaActual}/${mesActual}/${añoActual}`;
}