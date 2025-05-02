document.addEventListener('DOMContentLoaded', function() {
    const orden = JSON.parse(localStorage.getItem('orden_confirmada'));
    const resumen = document.getElementById('resumen-confirmacion');
    
    if (!orden) {
        window.location.href = 'catalogo.html';
        return;
    }
    
    resumen.innerHTML = `
        <h2>Resumen de tu orden #${orden.numeroOrden}</h2>
        <div class="detalle-orden">
            ${orden.items.map(item => `
                <div class="item-orden">
                    <p>${item.nombre} x ${item.cantidad}</p>
                    <p>${(item.precio * item.cantidad).toLocaleString()} COP</p>
                </div>
            `).join('')}
        </div>
        <div class="total-orden">
            <p><strong>Total:</strong> ${orden.total.toLocaleString()} COP</p>
        </div>
        <div class="envio-orden">
            <h3>Datos de envío</h3>
            <p>${orden.datosEnvio.nombre}</p>
            <p>${orden.datosEnvio.direccion}</p>
            <p>${orden.datosEnvio.ciudad}</p>
            <p>${orden.datosEnvio.telefono}</p>
        </div>
    `;
    
    // Opcional: Limpiar la orden después de mostrarla
    // localStorage.removeItem('orden_confirmada');
});