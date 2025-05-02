// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el carrito
function actualizarCarrito() {
    // Actualizar icono
    const contador = document.getElementById('contador-carrito');
    if(contador) {
        contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    }
    
    // Actualizar modal
    const itemsCarrito = document.getElementById('items-carrito');
    if(itemsCarrito) {
        itemsCarrito.innerHTML = '';
        
        let total = 0;
        
        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            
            itemsCarrito.innerHTML += `
                <div class="item-carrito">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div>
                        <h4>${item.nombre}</h4>
                        <p>${item.precio.toLocaleString()} COP x ${item.cantidad}</p>
                    </div>
                    <button class="eliminar-item" data-index="${index}">🗑️</button>
                </div>
            `;
        });
        
        // Actualizar total
        const totalElement = document.querySelector('#total-carrito span');
        if(totalElement) {
            totalElement.textContent = total.toLocaleString();
        }
        
        // Guardar en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

// Modificar el evento de compra existente
document.querySelectorAll('.boton-comprar').forEach(boton => {
    boton.addEventListener('click', function() {
        const producto = this.closest('.producto-catalogo');
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseInt(producto.querySelector('.precio').textContent.replace(/\D/g, ''));
        const imagen = producto.querySelector('.imagen-principal img').src;
        
        // Verificar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.nombre === nombre);
        
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
        }
        
        actualizarCarrito();
        
        // Mostrar notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.textContent = `¡${nombre} añadido al carrito!`;
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.remove();
        }, 2000);
    });
});

// Eventos del modal
const iconoCarrito = document.getElementById('icono-carrito');
if(iconoCarrito) {
    iconoCarrito.addEventListener('click', () => {
        document.getElementById('modal-carrito').style.display = 'block';
    });
}

const cerrarModal = document.querySelector('.cerrar-modal');
if(cerrarModal) {
    cerrarModal.addEventListener('click', () => {
        document.getElementById('modal-carrito').style.display = 'none';
    });
}

// Eliminar items
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminar-item')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});

// Botón de pagar
const botonPagar = document.getElementById('boton-pagar');
if(botonPagar) {
    botonPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
        } else {
            // Aquí integrarías con PSE
            alert('Redirigiendo a pasarela de pago...');
            // window.location.href = "pago.html";
        }
    });
}

// Inicializar carrito al cargar la página
actualizarCarrito();

document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    const filtroCategoria = document.getElementById('categoria');
    const filtroPrecio = document.getElementById('precio');
    const inputBusqueda = document.getElementById('busqueda');
    const productos = document.querySelectorAll('.producto-catalogo');

    function filtrarProductos() {
        const categoriaSeleccionada = filtroCategoria.value;
        const precioSeleccionado = filtroPrecio.value;
        const textoBusqueda = inputBusqueda.value.toLowerCase();

        productos.forEach(producto => {
            const cumpleCategoria = categoriaSeleccionada === 'todas' || 
                                  producto.dataset.categoria === categoriaSeleccionada;
            
            const cumplePrecio = precioSeleccionado === 'todos' || 
                                 cumpleRangoPrecio(producto.dataset.precio, precioSeleccionado);
            
            const cumpleBusqueda = producto.querySelector('h3').textContent.toLowerCase().includes(textoBusqueda) || 
                                   producto.querySelector('.artesano').textContent.toLowerCase().includes(textoBusqueda);

            if (cumpleCategoria && cumplePrecio && cumpleBusqueda) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });

        // Actualizar contador
        document.getElementById('total-productos').textContent = 
            document.querySelectorAll('.producto-catalogo[style="display: block"]').length;
    }

    function cumpleRangoPrecio(precio, rango) {
        precio = parseInt(precio);
        switch(rango) {
            case '0-50000': return precio <= 50000;
            case '50000-100000': return precio > 50000 && precio <= 100000;
            case '100000': return precio > 100000;
            default: return true;
        }
    }

    // Event listeners
    filtroCategoria.addEventListener('change', filtrarProductos);
    filtroPrecio.addEventListener('change', filtrarProductos);
    inputBusqueda.addEventListener('input', filtrarProductos);
    document.getElementById('boton-buscar').addEventListener('click', filtrarProductos);
});
// Mostrar/ocultar detalles
document.querySelectorAll('.boton-detalles').forEach(boton => {
    boton.addEventListener('click', function() {
        const detalles = this.closest('.info-producto').querySelector('.detalles-producto');
        const estaVisible = detalles.style.display === 'block';
        
        detalles.style.display = estaVisible ? 'none' : 'block';
        this.textContent = estaVisible ? '▼ Detalles' : '▲ Ocultar';
    });
});

// Función de compra (ejemplo básico)
// En catalogo.js, reemplazar la función de pago existente
document.getElementById('boton-pagar').addEventListener('click', function() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'error');
        return;
    }
    
    // Preparar datos para PSE
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const items = carrito.map(item => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad
    }));
    
    // Guardar transacción en localStorage antes de redirigir
    localStorage.setItem('transaccion_pendiente', JSON.stringify({
        items,
        total,
        fecha: new Date().toISOString()
    }));
    
    // Redirigir a página de pago (simulación)
    window.location.href = 'pago.html';
});
// Cambiar imagen principal al hacer clic en una imagen de la galería
document.querySelectorAll('.galeria-imagenes .img-producto').forEach(imagen => {
    imagen.addEventListener('click', function() {
        const nuevaImagen = this.src; // Obtén la URL de la nueva imagen
        const imagenPrincipal = this.closest('.producto-catalogo').querySelector('#imagen-principal-producto');
        imagenPrincipal.src = nuevaImagen; // Cambia la imagen principal por la seleccionada
    });
});

// Mostrar el botón cuando el usuario haga scroll
window.addEventListener('scroll', function() {
    const button = document.getElementById('scroll-to-top');
    
    if (window.scrollY > 500) {  // Aparece después de que el usuario ha desplazado 500px hacia abajo
        button.classList.add('visible');
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
        button.classList.remove('visible');
    }
});

// Redirigir al inicio de la página cuando se haga clic
document.getElementById('scroll-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Desplazamiento suave hacia el top
});


// Mostrar el botón cuando el usuario haga scroll
window.addEventListener('scroll', function() {
    const button = document.getElementById('scroll-to-top');
    
    if (window.scrollY > 500) {  // Aparece después de que el usuario ha desplazado 500px hacia abajo
        button.classList.add('visible');
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
        button.classList.remove('visible');
    }
});