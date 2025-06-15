// Configuración del torneo
const CONFIG = {
    // Fechas en UTC
    FECHA_INICIO_STREAM: '2024-06-14T00:00:00Z', // Fecha pasada para mostrar stream inmediatamente
    FECHA_LIMITE_REGISTRO: '2024-06-14T00:00:00Z', // Fecha pasada para cerrar registro
    
    // Zona horaria
    ZONA_HORARIA: 'America/Mazatlan', // Zona horaria de Culiacán (UTC-6)
    
    // Intervalos de actualización (en milisegundos)
    INTERVALO_BADGE: 300000, // 5 minutos
    INTERVALO_ESTADISTICAS: 300000, // 5 minutos
    INTERVALO_TWITCH: 5000, // 5 segundos
    INTERVALO_COUNTDOWN: 1000, // 1 segundo (mantenemos este para el contador)
    
    // Modo de prueba (cambiar a true para probar)
    MODO_PRUEBA: true,
    
    // Simular tiempo específico (true = simular después del evento)
    SIMULAR_DESPUES_EVENTO: true,
    
    // Mensajes
    MENSAJES: {
        EVENTO_ACTIVO: '🔥 EVENTO ACTIVO',
        REGISTRO_CERRADO: '⏳ REGISTRO CERRADO',
        EN_VIVO: '🚨 ¡ESTAMOS EN VIVO! 🚨',
        REGISTRO_FINALIZADO: '¡El registro ha finalizado! ¡Gracias por participar!',
        REGISTRO_GRATUITO: '¡Registro 100% gratuito!',
        ESTADISTICAS_DISPONIBLES: 'Ver estadísticas del torneo',
        ESTADISTICAS_NO_DISPONIBLES: 'Las estadísticas estarán disponibles 1 hora después del inicio del torneo',
        RECARGA_AUTOMATICA: '⚠️ La página se recargará automáticamente cuando inicie el evento. ¡No cierres esta ventana!'
    }
};

// Variable global para controlar si ya se inició la recarga
let recargaIniciada = false;
let ultimaRecarga = 0;
const TIEMPO_MINIMO_ENTRE_RECARGAS = 30000; // 30 segundos

// Función para recargar la página
function recargarPagina() {
    const ahora = Date.now();
    if (!recargaIniciada && !CONFIG.SIMULAR_DESPUES_EVENTO && (ahora - ultimaRecarga) > TIEMPO_MINIMO_ENTRE_RECARGAS) {
        console.log('Iniciando recarga de página...');
        recargaIniciada = true;
        ultimaRecarga = ahora;
        // En lugar de recargar inmediatamente, esperamos 2 segundos
        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
    }
}

// Función para obtener la fecha del evento (real o de prueba)
function obtenerFechaEvento() {
    if (CONFIG.MODO_PRUEBA) {
        if (CONFIG.SIMULAR_DESPUES_EVENTO) {
            // Simular que ya es después del evento (5:01 PM)
            const fechaPrueba = new Date();
            fechaPrueba.setHours(17, 1, 0, 0); // 5:01 PM
            fechaPrueba.setDate(fechaPrueba.getDate() - 1); // Ayer
            console.log('Modo prueba activo - Simulando después del evento:', fechaPrueba.toLocaleString());
            return fechaPrueba;
        } else {
            // Simular antes del evento (3:46 PM)
            const fechaPrueba = new Date();
            fechaPrueba.setHours(15, 46, 0, 0); // 3:46 PM
            if (fechaPrueba <= new Date()) {
                fechaPrueba.setDate(fechaPrueba.getDate() + 1);
            }
            console.log('Modo prueba activo - Evento programado para:', fechaPrueba.toLocaleString());
            return fechaPrueba;
        }
    }
    // En modo normal, usar la fecha configurada
    return new Date(CONFIG.FECHA_INICIO_STREAM);
}

// Función para obtener la fecha límite de registro (real o de prueba)
function obtenerFechaLimiteRegistro() {
    if (CONFIG.MODO_PRUEBA) {
        // Para pruebas: 2 minutos antes del evento
        const fechaEvento = obtenerFechaEvento();
        const fechaLimite = new Date(fechaEvento);
        fechaLimite.setMinutes(fechaLimite.getMinutes() - 2);
        return fechaLimite;
    }
    return new Date(CONFIG.FECHA_LIMITE_REGISTRO);
}

// Funciones para el torneo de Fortnite
function actualizarBadgeEvento() {
    // Usar UTC internamente
    const ahora = new Date();
    const badge = document.getElementById('announcement-badge');
    const torneoBtn = document.querySelector('.torneo-btn');
    const registerNote = document.querySelector('.register-note');
    
    const fechaLimiteRegistro = obtenerFechaLimiteRegistro();
    const fechaInicioStream = obtenerFechaEvento();
    
    if (ahora >= fechaInicioStream) {
        badge.textContent = CONFIG.MENSAJES.EN_VIVO;
        if (torneoBtn) {
            torneoBtn.style.display = 'none';
            if (registerNote) {
                registerNote.textContent = CONFIG.MENSAJES.REGISTRO_FINALIZADO;
            }
        }
    } else if (ahora >= fechaLimiteRegistro) {
        badge.textContent = CONFIG.MENSAJES.REGISTRO_CERRADO;
        if (torneoBtn) {
            torneoBtn.style.display = 'none';
            if (registerNote) {
                registerNote.textContent = CONFIG.MENSAJES.REGISTRO_FINALIZADO;
            }
        }
    } else {
        badge.textContent = CONFIG.MENSAJES.EVENTO_ACTIVO;
        if (torneoBtn) {
            torneoBtn.style.display = 'inline-flex';
            if (registerNote) {
                registerNote.textContent = CONFIG.MENSAJES.REGISTRO_GRATUITO;
            }
        }
    }
}

function mostrarTwitchSiEsHora() {
    const ahora = new Date();
    const fechaInicioStream = obtenerFechaEvento();
    const tiempoParaEvento = fechaInicioStream - ahora;
    
    console.log('Verificación de tiempo:', {
        ahora: ahora.toLocaleString(),
        fechaEvento: fechaInicioStream.toLocaleString(),
        tiempoRestante: Math.floor(tiempoParaEvento / 1000) + ' segundos',
        simulandoDespues: CONFIG.SIMULAR_DESPUES_EVENTO
    });
    
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownTimer = document.querySelector('.countdown-timer');
    const twitchEmbed = document.getElementById('twitch-embed');
    const recargaMensaje = document.getElementById('recarga-mensaje');
    
    // Si estamos simulando después del evento, mostrar directamente el stream
    if (CONFIG.SIMULAR_DESPUES_EVENTO) {
        console.log('Modo simulación después del evento - Mostrando stream');
        if (countdownTimer) countdownTimer.style.display = 'none';
        if (countdownContainer) countdownContainer.style.display = 'none';
        if (twitchEmbed) twitchEmbed.style.display = 'block';
        if (recargaMensaje) recargaMensaje.style.display = 'none';
        return;
    }
    
    // Si faltan menos de 5 minutos para el evento, mostrar mensaje de recarga
    if (tiempoParaEvento > 0 && tiempoParaEvento <= 300000) { // 5 minutos en milisegundos
        console.log('Mostrando mensaje de recarga automática - Faltan menos de 5 minutos');
        if (recargaMensaje) {
            recargaMensaje.style.display = 'block';
        }
    }
    
    // Si es hora del evento o ya pasó, recargar la página
    if (tiempoParaEvento <= 0 && !CONFIG.SIMULAR_DESPUES_EVENTO) {
        console.log('¡Es hora del evento! Forzando recarga...');
        recargarPagina();
        return;
    }
    
    const mostrarTwitch = ahora >= fechaInicioStream;
    if (mostrarTwitch) {
        console.log('Mostrando stream de Twitch');
        if (countdownTimer) countdownTimer.style.display = 'none';
        if (countdownContainer) countdownContainer.style.display = 'none';
        if (twitchEmbed) twitchEmbed.style.display = 'block';
        if (recargaMensaje) recargaMensaje.style.display = 'none';
    } else {
        if (countdownTimer) countdownTimer.style.display = 'flex';
        if (countdownContainer) countdownContainer.style.display = 'block';
        if (twitchEmbed) twitchEmbed.style.display = 'none';
    }
}

// Contador regresivo actualizado
function updateCountdown() {
    const eventDate = obtenerFechaEvento().getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Si el evento ya comenzó, forzar la recarga
    if (distance <= 0) {
        console.log('Contador llegó a 0, forzando recarga desde updateCountdown');
        recargarPagina();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar el contador
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    if (document.getElementById('seconds')) {
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Log cada 10 segundos para no saturar la consola
    if (seconds % 10 === 0) {
        console.log(`Tiempo restante: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}

// Función para manejar el estado del botón de estadísticas
function actualizarEstadoEstadisticas() {
    const ahora = new Date();
    const statsBtn = document.querySelector('.stats-btn');
    const fechaInicioStream = obtenerFechaEvento();
    const fechaActivacionEstadisticas = new Date(fechaInicioStream.getTime() + (60 * 60 * 1000)); // 1 hora después del inicio
    
    if (statsBtn) {
        if (ahora >= fechaActivacionEstadisticas) {
            // Activar el botón solo si no está activo
            if (statsBtn.style.opacity !== '1') {
                statsBtn.style.opacity = '1';
                statsBtn.style.pointerEvents = 'auto';
                statsBtn.style.cursor = 'pointer';
                statsBtn.title = CONFIG.MENSAJES.ESTADISTICAS_DISPONIBLES;
            }
        } else {
            // Desactivar el botón solo si no está desactivado
            if (statsBtn.style.opacity !== '0.5') {
                statsBtn.style.opacity = '0.5';
                statsBtn.style.pointerEvents = 'none';
                statsBtn.style.cursor = 'not-allowed';
                statsBtn.title = CONFIG.MENSAJES.ESTADISTICAS_NO_DISPONIBLES;
            }
        }
    }
}

// Inicialización de funciones cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando funciones del torneo...');
    console.log('Modo prueba:', CONFIG.MODO_PRUEBA ? 'ACTIVADO' : 'DESACTIVADO');
    console.log('Fecha del evento (prueba):', obtenerFechaEvento().toLocaleString());
    
    // Inicializar y configurar intervalos
    actualizarBadgeEvento();
    const badgeInterval = setInterval(actualizarBadgeEvento, CONFIG.INTERVALO_BADGE);

    actualizarEstadoEstadisticas();
    const statsInterval = setInterval(actualizarEstadoEstadisticas, CONFIG.INTERVALO_ESTADISTICAS);

    mostrarTwitchSiEsHora();
    const twitchInterval = setInterval(mostrarTwitchSiEsHora, CONFIG.INTERVALO_TWITCH);

    // Inicializar el contador regresivo inmediatamente y actualizarlo cada segundo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, CONFIG.INTERVALO_COUNTDOWN);

    // Limpiar intervalos cuando la página se descarga
    window.addEventListener('beforeunload', function() {
        clearInterval(badgeInterval);
        clearInterval(statsInterval);
        clearInterval(twitchInterval);
        clearInterval(countdownInterval);
    });
}); 