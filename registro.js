document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-registro');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (!validarFormulario()) {
                mostrarNotificacion('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            // Simular envío del formulario
            mostrarNotificacion('Enviando solicitud...', 'info');
            
            setTimeout(() => {
                // Guardar datos en localStorage (simulación)
                const datosArtesano = {
                    nombre: document.getElementById('nombre-completo').value,
                    email: document.getElementById('email').value,
                    municipio: document.getElementById('municipio').value,
                    tipoArtesania: document.getElementById('tipo-artesania').value,
                    fechaRegistro: new Date().toISOString()
                };
                
                localStorage.setItem('artesano_pendiente', JSON.stringify(datosArtesano));
                
                // Mostrar confirmación
                mostrarNotificacion('¡Solicitud enviada con éxito!', 'success');
                
                // Redirigir después de 3 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            }, 2000);
        });
    }
    
    // Función para validar el formulario
    function validarFormulario() {
        const camposRequeridos = formulario.querySelectorAll('[required]');
        let valido = true;
        
        camposRequeridos.forEach(campo => {
            if (!campo.value.trim()) {
                campo.classList.add('campo-invalido');
                valido = false;
            } else {
                campo.classList.remove('campo-invalido');
            }
        });
        
        // Validar términos y condiciones
        if (!document.getElementById('terminos').checked) {
            document.querySelector('.terminos label').classList.add('campo-invalido');
            valido = false;
        } else {
            document.querySelector('.terminos label').classList.remove('campo-invalido');
        }
        
        return valido;
    }
    
    // Mostrar notificación
    function mostrarNotificacion(mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }
    
    // Mostrar/ocultar botón de scroll
    window.addEventListener('scroll', function() {
        const button = document.getElementById('scroll-to-top');
        
        if (window.scrollY > 500) {
            button.classList.add('visible');
            button.classList.remove('hidden');
        } else {
            button.classList.add('hidden');
            button.classList.remove('visible');
        }
    });
    
    // Redirigir al inicio de la página
    document.getElementById('scroll-to-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});