// Ejemplo: Evento para el botón "Explorar Catálogo"
document.querySelectorAll(".boton-ver-mas").forEach(function(boton) {
    boton.addEventListener("click", function() {
        window.location.href = "catalogo.html"; // Redirige al catálogo
    });
});

// En tu main.js (o dentro de <script> al final del body)
document.getElementById("boton-cta").addEventListener("click", function() {
    window.location.href = "catalogo.html"; // Redirección
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
