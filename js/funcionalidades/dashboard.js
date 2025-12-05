feather.replace();

const sidebar = document.querySelector('.sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}

sidebar.addEventListener('transitionend', () => {
    progressChart.resize();
});

const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Horas de Estudo',
            data: [3, 4, 2, 5, 6, 4, 3],
            borderColor: 'rgba(123, 51, 207, 1)',
            backgroundColor: 'rgba(123, 51, 207, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(123, 51, 207, 1)',
            pointBorderWidth: 2,
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } }
        }
    }
});

window.addEventListener('load', () => progressChart.resize());