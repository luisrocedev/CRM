async function cargarGraficoFunnel() {
    const res = await fetch('/api/contacts');
    const data = await res.json();

    const estados = ['Nuevo', 'Interesado', 'En Negociacion', 'Cerrado'];
    const conteo = estados.map(estado => data.filter(c => c.estado_funnel === estado).length);

    const ctx = document.getElementById('funnelChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: estados,
            datasets: [{
                label: 'Clientes por etapa',
                data: conteo,
                backgroundColor: ['#007BFF', '#FFC107', '#28A745', '#DC3545']
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000
            }
        }
    });
}

// Cargar gráficos al inicio
window.onload = function() {
    listarContactos();
    cargarGraficoFunnel();
};
