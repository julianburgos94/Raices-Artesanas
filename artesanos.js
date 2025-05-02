
// Mostrar el botón cuando el usuario haga scroll
window.addEventListener('scroll', function() {
    const button = document.getElementById('scroll-to-top');
    
    if (window.scrollY > 200) {  // Aparece después de que el usuario ha desplazado 200px hacia abajo
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
