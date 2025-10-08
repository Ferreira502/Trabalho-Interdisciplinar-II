// Simulate real-time heart rate data
let currentBPM = 72;
let chartData = [];

// Generate initial chart data
function generateInitialData() {
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now - i * 60 * 60 * 1000);
        const bpm = 65 + Math.random() * 20 + Math.sin(i * 0.5) * 10;
        chartData.push({
            time: time,
            bpm: Math.round(bpm)
        });
    }
}

// Update BPM in real-time
function updateBPM() {
    const variation = (Math.random() - 0.5) * 6;
    currentBPM = Math.max(50, Math.min(120, currentBPM + variation));
    document.getElementById('currentBPM').textContent = Math.round(currentBPM);

    // Add new data point
    chartData.push({
        time: new Date(),
        bpm: Math.round(currentBPM)
    });

    // Keep only last 24 hours
    if (chartData.length > 24) {
        chartData.shift();
    }

    updateChart();
}

// Simple chart implementation
function drawChart() {
    const canvas = document.getElementById('heartRateChart');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (chartData.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Find min/max values
    const bpmValues = chartData.map(d => d.bpm);
    const minBPM = Math.min(...bpmValues) - 5;
    const maxBPM = Math.max(...bpmValues) + 5;

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();

        // Y-axis labels
        const value = Math.round(maxBPM - (maxBPM - minBPM) * (i / 5));
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value + ' BPM', padding - 10, y + 4);
    }

    // Draw the heart rate line
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 3;
    ctx.beginPath();

    chartData.forEach((point, index) => {
        const x = padding + (chartWidth / (chartData.length - 1)) * index;
        const y = padding + chartHeight - ((point.bpm - minBPM) / (maxBPM - minBPM)) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#c62828';
    chartData.forEach((point, index) => {
        const x = padding + (chartWidth / (chartData.length - 1)) * index;
        const y = padding + chartHeight - ((point.bpm - minBPM) / (maxBPM - minBPM)) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // X-axis time labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i < chartData.length; i += 4) {
        const x = padding + (chartWidth / (chartData.length - 1)) * i;
        const time = chartData[i].time.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        ctx.fillText(time, x, canvas.height - 10);
    }
}

function updateChart() {
    drawChart();
}

// Time filter functionality
document.querySelectorAll('.time-filter').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.time-filter').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Here you would typically fetch data for the selected time period
        console.log('Selected period:', this.dataset.period);
    });
});

// Emergency button (placeholder)
document.querySelector('.action-btn[href="#"]:last-child').addEventListener('click', function (e) {
    e.preventDefault();
    if (confirm('Deseja acionar o botão de emergência? Isso notificará imediatamente sua equipe médica.')) {
        alert('Emergência acionada! Sua equipe médica foi notificada.');
    }
});

// Initialize
generateInitialData();
drawChart();

// Update BPM every 5 seconds
setInterval(updateBPM, 5000);

// Resize chart when window resizes
window.addEventListener('resize', function () {
    setTimeout(drawChart, 100);
});

// Update current time every minute
setInterval(function () {
    const now = new Date();
    const timeElements = document.querySelectorAll('.bpm-label + div');
    if (timeElements.length > 0) {
        // This would update the "Última leitura" time
    }
}, 60000);