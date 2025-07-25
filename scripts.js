/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarOpen = document.body.querySelector('#sidebarOpen');
    const sidebarClose = document.body.querySelector('#sidebarClose');
    if (sidebarOpen) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarOpen.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });

        sidebarClose.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('datos/datos.json');
    const datos = await res.json();

    document.getElementById('nombre').textContent = datos.nombre;
    document.getElementById('dni').textContent = datos.dni;
    document.getElementById('fecha_nacimiento').textContent = datos.fecha_nacimiento;
    document.getElementById('sexo').textContent = datos.sexo;

    document.getElementById('foto').src = 'datos/foto.jpg';
  } catch (e) {
    console.error('Error cargando datos:', e);
  }
});
