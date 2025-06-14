// Funciones para el torneo de Fortnite
function actualizarBadgeEvento() {
    // Hora de CDMX (UTC-6)
    const ahoraCDMX = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
    const badge = document.getElementById('announcement-badge');
    const torneoBtn = document.querySelector('.torneo-btn');
    const registerNote = document.querySelector('.register-note');
    
    // Fecha límite de registro: 14 de junio 2025 14:00 CDMX
    const fechaLimiteRegistro = new Date('2025-06-14T14:00:00-06:00');
    
    // Fecha inicio del stream: 14 de junio 2025 18:00 CDMX
    const fechaInicioStream = new Date('2025-06-14T18:00:00-06:00');
    
    if (ahoraCDMX >= fechaInicioStream) {
        badge.textContent = "🚨 ¡ESTAMOS EN VIVO! 🚨";
        if (torneoBtn) {
            torneoBtn.style.display = 'none';
            if (registerNote) {
                registerNote.textContent = "¡El registro ha finalizado! ¡Gracias por participar!";
            }
        }
    } else if (ahoraCDMX >= fechaLimiteRegistro) {
        badge.textContent = "⏳ REGISTRO CERRADO";
        if (torneoBtn) {
            torneoBtn.style.display = 'none';
            if (registerNote) {
                registerNote.textContent = "¡El registro ha finalizado! ¡Gracias por participar!";
            }
        }
    } else {
        badge.textContent = "🔥 EVENTO ACTIVO";
        if (torneoBtn) {
            torneoBtn.style.display = 'inline-flex';
            if (registerNote) {
                registerNote.textContent = "¡Registro 100% gratuito!";
            }
        }
    }
}

function mostrarTwitchSiEsHora() {
    // Hora de CDMX (UTC-6)
    const ahoraCDMX = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
    const fechaInicioStream = new Date('2025-06-14T18:00:00-06:00');
    
    const mostrarTwitch = ahoraCDMX >= fechaInicioStream;
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownTimer = document.querySelector('.countdown-timer');
    const twitchEmbed = document.getElementById('twitch-embed');
    
    if (mostrarTwitch) {
        if (countdownTimer) countdownTimer.style.display = 'none';
        if (countdownContainer) countdownContainer.style.display = 'none';
        if (twitchEmbed) twitchEmbed.style.display = 'block';
    } else {
        if (countdownTimer) countdownTimer.style.display = 'flex';
        if (countdownContainer) countdownContainer.style.display = 'block';
        if (twitchEmbed) twitchEmbed.style.display = 'none';
    }
}

// Contador regresivo actualizado
function updateCountdown() {
    const eventDate = new Date('2025-06-14T18:00:00-06:00').getTime(); // 6 PM CDMX
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
    }
}

// Función para manejar el estado del botón de estadísticas
function actualizarEstadoEstadisticas() {
    const ahoraCDMX = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
    const statsBtn = document.querySelector('.stats-btn');
    const fechaInicioStream = new Date('2025-06-14T18:00:00-06:00');
    const fechaActivacionEstadisticas = new Date(fechaInicioStream.getTime() + (60 * 60 * 1000)); // 1 hora después del inicio
    
    if (statsBtn) {
        if (ahoraCDMX >= fechaActivacionEstadisticas) {
            // Activar el botón
            statsBtn.style.opacity = '1';
            statsBtn.style.pointerEvents = 'auto';
            statsBtn.style.cursor = 'pointer';
            statsBtn.title = 'Ver estadísticas del torneo';
        } else {
            // Desactivar el botón
            statsBtn.style.opacity = '0.5';
            statsBtn.style.pointerEvents = 'none';
            statsBtn.style.cursor = 'not-allowed';
            statsBtn.title = 'Las estadísticas estarán disponibles 1 hora después del inicio del torneo';
        }
    }
}

// Inicialización de funciones cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar y configurar intervalos
    actualizarBadgeEvento();
    setInterval(actualizarBadgeEvento, 60000);

    actualizarEstadoEstadisticas();
    setInterval(actualizarEstadoEstadisticas, 60000);

    mostrarTwitchSiEsHora();
    setInterval(mostrarTwitchSiEsHora, 60000);

    updateCountdown();
    setInterval(updateCountdown, 60000);
}); 