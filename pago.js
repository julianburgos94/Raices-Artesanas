document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del carrito desde localStorage
    const transaccion = JSON.parse(localStorage.getItem('transaccion_pendiente'));
    
    if (!transaccion) {
        window.location.href = 'catalogo.html';
        return;
    }
    
    // Mostrar resumen
    const itemsResumen = document.getElementById('items-resumen');
    const totalResumen = document.querySelector('#total-resumen span');
    
    itemsResumen.innerHTML = '';
    transaccion.items.forEach(item => {
        itemsResumen.innerHTML += `
            <div class="item-resumen">
                <p>${item.nombre} x ${item.cantidad}</p>
                <p>${item.precio.toLocaleString()} COP</p>
            </div>
        `;
    });
    
    totalResumen.textContent = transaccion.total.toLocaleString();
    
    // Procesar pago
    document.getElementById('boton-confirmar-pago').addEventListener('click', function() {
        // Validar formulario
        const formularioValido = Array.from(document.querySelectorAll('#formulario-envio input')).every(input => input.value.trim() !== '');
        
        if (!formularioValido) {
            mostrarNotificacion('Por favor completa todos los datos de envío', 'error');
            return;
        }
        
        // Simular pago con PSE
        mostrarNotificacion('Procesando pago con PSE...', 'info');
        
        setTimeout(() => {
            // Guardar confirmación
            localStorage.setItem('orden_confirmada', JSON.stringify({
                ...transaccion,
                datosEnvio: {
                    nombre: document.getElementById('nombre').value,
                    direccion: document.getElementById('direccion').value,
                    ciudad: document.getElementById('ciudad').value,
                    telefono: document.getElementById('telefono').value
                },
                fechaConfirmacion: new Date().toISOString(),
                numeroOrden: 'ORD-' + Math.floor(Math.random() * 1000000)
            }));
            
            // Limpiar carrito
            localStorage.removeItem('carrito');
            localStorage.removeItem('transaccion_pendiente');
            
            // Redirigir a confirmación
            window.location.href = 'confirmacion.html';
        }, 2000);
    });
});

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