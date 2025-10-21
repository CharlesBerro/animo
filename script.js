// --- ¡CONFIGURA TU META AQUÍ! ---
const fechaMeta = 'December 2, 2025 23:59:59';
// --- ¡CONFIGURA LA FECHA DE INICIO AQUÍ! ---
// Para que el progreso se calcule correctamente, necesitamos saber cuándo empezó el reto.
const fechaInicio = 'October 1, 2025 00:00:00'; 

// --- MENSAJES DE ÁNIMO ---
const mensajes = [
    "¡Cada segundo cuenta! Sigue así. 💪",
    "Estás haciendo un trabajo increíble. ✨",
    "La constancia es la clave del éxito. 💖",
    "Imagina el momento en que lo logres. ¡Ya casi! 😊",
    "Cada paso, por pequeño que sea, te acerca a tu meta. 👣",
    "¡No te rindas! Lo mejor está por venir. 🌟",
    "Confía en el proceso y en ti misma. 🧘‍♀️"
];

// Elementos del DOM
const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');
const countdownEl = document.getElementById('countdown');
const mensajeFinalEl = document.getElementById('mensaje-final');
const mensajeAnimoEl = document.querySelector('#mensaje-animo p');
const climberEl = document.getElementById('climber');
const progressPercentageEl = document.getElementById('progress-percentage');
const mountainContainer = document.querySelector('.progress-mountain-container');

let valoresAnteriores = {};

// --- Función para actualizar el progreso de la escalada ---
function actualizarProgreso() {
    const inicioMs = new Date(fechaInicio).getTime();
    const metaMs = new Date(fechaMeta).getTime();
    const ahoraMs = new Date().getTime();

    const duracionTotal = metaMs - inicioMs;
    const tiempoTranscurrido = ahoraMs - inicioMs;

    let porcentajeProgreso = (tiempoTranscurrido / duracionTotal) * 100;
    porcentajeProgreso = Math.min(100, Math.max(0, porcentajeProgreso)); // Asegura que esté entre 0 y 100

    // Actualizar texto del porcentaje
    progressPercentageEl.textContent = `${porcentajeProgreso.toFixed(1)}%`;

    // Calcular la posición del escalador en la montaña (sube en diagonal)
    const posX = porcentajeProgreso; // Eje X (0% a 100%)
    const posY = porcentajeProgreso; // Eje Y (0% a 100%)

    // Actualizar las variables CSS para mover el ícono
    climberEl.style.setProperty('--start-x', `${posX}%`);
    climberEl.style.setProperty('--start-y', `${posY}%`);

    // Si se alcanza la meta, colocar el escalador junto a la bandera
    if (porcentajeProgreso >= 100) {
        climberEl.style.setProperty('--start-x', `50%`);
        climberEl.style.setProperty('--start-y', `95%`);
    }
}


function actualizarCronometro() {
    const fechaMetaDate = new Date(fechaMeta);
    const fechaActual = new Date();
    const diferenciaTotalSegundos = (fechaMetaDate - fechaActual) / 1000;

    if (diferenciaTotalSegundos < 0) {
        clearInterval(intervaloCronometro);
        clearInterval(intervaloMensajes);
        countdownEl.style.display = 'none';
        mensajeAnimoEl.parentElement.style.display = 'none';
        mensajeFinalEl.style.display = 'block';
        mountainContainer.style.display = 'none'; // Ocultar montaña al finalizar
        return;
    }

    // Actualizar el progreso de la montaña
    actualizarProgreso();

    const dias = Math.floor(diferenciaTotalSegundos / 3600 / 24);
    const horas = Math.floor(diferenciaTotalSegundos / 3600) % 24;
    const minutos = Math.floor(diferenciaTotalSegundos / 60) % 60;
    const segundos = Math.floor(diferenciaTotalSegundos) % 60;

    actualizarElemento(diasEl, dias, 'dias');
    actualizarElemento(horasEl, horas, 'horas');
    actualizarElemento(minutosEl, minutos, 'minutos');
    actualizarElemento(segundosEl, segundos, 'segundos');
}

function formatoTiempo(tiempo) {
    return tiempo < 10 ? `0${tiempo}` : tiempo;
}

function actualizarElemento(elemento, valor, clave) {
    const valorFormateado = formatoTiempo(valor);
    if (valoresAnteriores[clave] !== valorFormateado) {
        elemento.innerHTML = valorFormateado;
        elemento.classList.add('changed');
        setTimeout(() => {
            elemento.classList.remove('changed');
        }, 600);
        valoresAnteriores[clave] = valorFormateado;
    }
}

function cambiarMensajeDeAnimo() {
    const indiceAleatorio = Math.floor(Math.random() * mensajes.length);
    mensajeAnimoEl.parentElement.style.animation = 'none';
    void mensajeAnimoEl.parentElement.offsetWidth;
    mensajeAnimoEl.parentElement.style.animation = 'fadeIn 1s ease-out';
    mensajeAnimoEl.innerHTML = mensajes[indiceAleatorio];
}

const intervaloCronometro = setInterval(actualizarCronometro, 1000);
const intervaloMensajes = setInterval(cambiarMensajeDeAnimo, 10000);

// Llamadas iniciales
actualizarCronometro();
cambiarMensajeDeAnimo();
