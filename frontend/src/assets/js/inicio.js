console.log("Inicio JS cargado");

// Variables del modal
const modal = document.getElementById('modalOverlay');
const form = document.getElementById('editReservaForm');

// Abrir modal y cargar datos
document.addEventListener('click', function(e) {
    if (e.target.closest('button[title="Editar"]')) {
        const row = e.target.closest('tr');
        const cells = row.cells;
        
        // Cargar datos en el formulario
        document.getElementById('cedula').value = cells[0].textContent;
        document.getElementById('pasajero').value = cells[1].textContent;
        document.getElementById('origen').value = cells[2].textContent.toLowerCase();
        document.getElementById('destino').value = cells[3].textContent.toLowerCase();
        
        // Convertir fecha DD/MM/YYYY a YYYY-MM-DD
        const fecha = cells[4].textContent.split('/');
        document.getElementById('fecha').value = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;
        document.getElementById('valor').value = cells[5].textContent;
        
        // Abrir modal
        modal.classList.add('active');
        
        // Guardar referencia de la fila para actualizar
        form.currentRow = row;
    }
});

// Cerrar modal
function closeModal() {
    modal.classList.remove('active');
    form.reset();
}

// Eventos para cerrar modal
document.getElementById('btnCloseModal').onclick = closeModal;
document.getElementById('btnCancelModal').onclick = closeModal;
modal.onclick = (e) => e.target === modal && closeModal();
document.onkeydown = (e) => e.key === 'Escape' && closeModal();

// Enviar formulario
form.onsubmit = function(e) {
    e.preventDefault();
    
    if (this.currentRow) {
        const cells = this.currentRow.cells;
        const formData = new FormData(this);
        
        // Actualizar tabla
        cells[0].textContent = formData.get('cedula');
        cells[1].textContent = formData.get('pasajero');
        cells[2].textContent = formData.get('origen');
        cells[3].textContent = formData.get('destino');
        
        // Convertir fecha YYYY-MM-DD a DD/MM/YYYY
        const fecha = formData.get('fecha').split('-');
        cells[4].textContent = `${fecha[2]}/${fecha[1]}/${fecha[0]}`;
        cells[5].textContent = formData.get('valor');
    }
    
    closeModal();
};

// Buscador simple
document.getElementById('searchInput').oninput = function() {
    const search = this.value.toLowerCase();
    document.querySelectorAll('.reservas-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
};