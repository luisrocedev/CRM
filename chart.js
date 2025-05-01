// Variables globales para almacenar datos y configuraciones
let chartData = {
    labels: [],
    datasets: []
};
let currentChartType = 'funnel';
let chartOptions = {};
let chartColors = ['#3f8efc', '#20c997', '#ffc107', '#dc3545'];

// Función para cargar y renderizar el gráfico del funnel
async function cargarGraficoFunnel() {
    const canvas = document.getElementById('funnelChart');
    if (!canvas) return; // No intentar graficar si no existe el canvas

    // Obtener datos de la API
    try {
        const res = await fetch('/api/contactos');
        const data = await res.json();
        
        // Procesar datos para el gráfico
        const estados = ['Nuevo', 'Interesado', 'En Negociacion', 'Cerrado'];
        const conteo = estados.map(estado => data.filter(c => c.estado_funnel === estado).length);
        
        // Almacenar datos para uso posterior
        chartData.labels = estados;
        chartData.datasets = [{
            label: 'Clientes por etapa',
            data: conteo,
            backgroundColor: chartColors
        }];
        
        // Disparar evento para actualizar las estadísticas
        const event = new CustomEvent('funnelDataLoaded', {
            detail: {
                labels: estados,
                data: conteo
            }
        });
        window.dispatchEvent(event);
        
        // Iniciar con el gráfico de tipo funnel
        renderChart('funnel');
        
        // Generar datos de conversión entre etapas para la tabla
        generateConversionData(estados, conteo);
    } catch (e) {
        console.error('Error al cargar datos:', e);
        canvas.parentNode.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #dc3545;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>No se pudieron cargar los datos del funnel.</p>
            </div>
        `;
    }
}

// Función para generar datos de conversión entre etapas
function generateConversionData(estados, conteo) {
    const tbody = document.getElementById('conversionData');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Generar filas de datos de conversión
    for (let i = 0; i < estados.length - 1; i++) {
        const tr = document.createElement('tr');
        
        const conversionRate = conteo[i] > 0 
            ? Math.round((conteo[i+1] / conteo[i]) * 100) 
            : 0;
        
        const randomDays = Math.round(Math.random() * 10 + 3);
        
        tr.innerHTML = `
            <td>${estados[i]}</td>
            <td>${estados[i+1]}</td>
            <td>${conversionRate}%</td>
            <td>${randomDays} días</td>
        `;
        
        tbody.appendChild(tr);
    }
}

// Función para renderizar el gráfico según el tipo seleccionado
function renderChart(type) {
    const canvas = document.getElementById('funnelChart');
    if (!canvas) return;
    
    // Destruir el gráfico anterior si existe
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    // Configurar opciones según el tipo de gráfico
    currentChartType = type;
    
    switch(type) {
        case 'funnel':
            // Configuración para gráfico de embudo
            chartOptions = {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: function(value) {
                            return value;
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            };
            break;
            
        case 'bar':
            // Configuración para gráfico de barras
            chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value) {
                            return value;
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1000
                }
            };
            break;
            
        case 'line':
            // Configuración para gráfico de líneas
            chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1000
                }
            };
            
            // Cambiar propiedades del dataset para gráfico de líneas
            chartData.datasets[0].backgroundColor = 'rgba(63, 142, 252, 0.1)';
            chartData.datasets[0].borderColor = '#3f8efc';
            chartData.datasets[0].fill = true;
            chartData.datasets[0].tension = 0.4;
            chartData.datasets[0].pointBackgroundColor = '#3f8efc';
            chartData.datasets[0].pointBorderColor = '#fff';
            chartData.datasets[0].pointRadius = 5;
            chartData.datasets[0].pointHoverRadius = 7;
            break;
    }
    
    // Crear el gráfico con la configuración seleccionada
    const actualType = type === 'funnel' ? 'bar' : type;
    window.myChart = new Chart(canvas.getContext('2d'), {
        type: actualType,
        data: {
            labels: chartData.labels,
            datasets: chartData.datasets
        },
        options: chartOptions,
        plugins: type !== 'line' ? [ChartDataLabels] : []
    });
    
    // Mostrar u ocultar el contenedor de etapas del funnel
    const stagesContainer = document.getElementById('stagesContainer');
    if (stagesContainer) {
        stagesContainer.style.display = type === 'funnel' ? 'flex' : 'none';
    }
}

// Función para actualizar el tipo de gráfico
function updateChartType(type) {
    renderChart(type);
}

// Cargar gráficos al inicio
window.addEventListener('DOMContentLoaded', function() {
    cargarGraficoFunnel();
});
