function goBack() {
    window.history.back();
}

function sendNotification() {
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('notificationPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('notificationPopup').style.display = 'none';
}

function confirmSendNotification() {
    const message = document.getElementById('notificationMessage').value;
    if (message.trim()) {
        alert('✅ Notificação enviada com sucesso para Maria Silva!\n\nMensagem: ' + message);
        closePopup();
        document.getElementById('notificationMessage').value = '';
    } else {
        alert('⚠️ Por favor, digite uma mensagem.');
    }
}

function callEmergency() {
    if (confirm('🚨 Deseja acionar o SAMU para Maria Silva?\n\nLocalização: Rua das Flores, 123 - Centro\nStatus: Crítico - 125 BPM')) {
        alert('🚨 SAMU acionado com sucesso!\n\nProtocolo: #EMG001\nTempo estimado: 8-12 minutos\n\nEquipe médica a caminho da localização.');
    }
}

function addNote() {
    const note = prompt('📝 Adicionar nota sobre Maria Silva:');
    if (note) {
        alert('✅ Nota adicionada ao prontuário de Maria Silva.');
    }
}

function scheduleVisit() {
    alert('🗓️ Abrindo agenda para agendar consulta com Maria Silva...');
}

function prescribeMed() {
    alert('💊 Abrindo sistema de prescrição para Maria Silva...');
}

function shareData() {
    alert('📊 Preparando relatório de Maria Silva para compartilhamento...');
}

// Simular atualização de dados em tempo real
function updateVitalSigns() {
    const bpmElement = document.querySelector('.vital-value.critical');
    const currentBpm = parseInt(bpmElement.textContent);

    // Simular variação de ±5 BPM
    const variation = Math.floor(Math.random() * 11) - 5;
    const newBpm = Math.max(60, Math.min(160, currentBpm + variation));

    bpmElement.textContent = newBpm;

    // Atualizar status baseado no novo valor
    if (newBpm > 120) {
        bpmElement.className = 'vital-value critical';
    } else if (newBpm > 100) {
        bpmElement.className = 'vital-value warning';
    } else {
        bpmElement.className = 'vital-value normal';
    }

    // Atualizar timestamp da última medição
    const timeElement = document.querySelector('.vital-item .vital-label');
    if (timeElement && timeElement.textContent === 'Última Medição') {
        timeElement.previousElementSibling.textContent = Math.floor(Math.random() * 60) + 's';
    }
}

// Função para adicionar novos alertas
function addNewAlert(type, message) {
    const alertsList = document.querySelector('.alerts-list');
    const newAlert = document.createElement('div');
    newAlert.className = `alert-item ${type}`;

    const now = new Date();
    const timeText = `há ${Math.floor(Math.random() * 5) + 1} minutos`;

    newAlert.innerHTML = `
                <div class="alert-time">${timeText}</div>
                <div class="alert-message">${message}</div>
            `;

    // Inserir no topo da lista
    alertsList.insertBefore(newAlert, alertsList.firstChild);

    // Manter apenas os últimos 10 alertas
    while (alertsList.children.length > 10) {
        alertsList.removeChild(alertsList.lastChild);
    }
}

// Função para simular novos alertas aleatórios
function simulateAlerts() {
    const alertTypes = [
        { type: 'warning', message: 'Pequena variação na frequência cardíaca detectada' },
        { type: 'critical', message: 'Frequência cardíaca acima do limite crítico' },
        { type: 'warning', message: 'Dispositivo com bateria baixa - 15%' },
        { type: 'critical', message: 'Paciente saiu da zona de segurança' }
    ];

    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    addNewAlert(randomAlert.type, randomAlert.message);
}

// Função para enviar mensagem WhatsApp personalizada
function sendWhatsAppMessage(type) {
    const messages = {
        checkup: "Olá Maria! Sou o Dr. João Santos. Como você está se sentindo? Notei alguns valores elevados no seu monitoramento.",
        medication: "Oi Maria! Não esqueça de tomar sua medicação no horário correto. Qualquer dúvida, me chame!",
        appointment: "Olá! Gostaria de agendar uma consulta para avaliarmos seus sinais vitais. Você tem disponibilidade esta semana?",
        emergency: "Maria, detectei valores preocupantes no seu monitor. Você está se sentindo bem? Precisa de ajuda?"
    };

    const selectedMessage = messages[type] || messages.checkup;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(selectedMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Adicionar opções de mensagem WhatsApp
function showWhatsAppOptions() {
    const options = [
        { key: 'checkup', text: '🔍 Check-up Geral' },
        { key: 'medication', text: '💊 Lembrete Medicação' },
        { key: 'appointment', text: '📅 Agendar Consulta' },
        { key: 'emergency', text: '🚨 Situação de Emergência' }
    ];

    let message = "Escolha o tipo de mensagem:\n\n";
    options.forEach((option, index) => {
        message += `${index + 1}. ${option.text}\n`;
    });

    const choice = prompt(message + "\nDigite o número da opção (1-4):");
    const optionIndex = parseInt(choice) - 1;

    if (optionIndex >= 0 && optionIndex < options.length) {
        sendWhatsAppMessage(options[optionIndex].key);
    }
}

// Função para exportar dados do paciente
function exportPatientData() {
    const patientData = {
        name: "Maria Silva",
        id: "#FV001",
        currentBPM: document.querySelector('.vital-value.critical').textContent,
        status: "CRÍTICO",
        location: "Rua das Flores, 123 - Centro",
        lastUpdate: new Date().toLocaleString('pt-BR'),
        alerts: Array.from(document.querySelectorAll('.alert-message')).map(alert => alert.textContent),
        vitals: {
            heartRate: "125 BPM",
            trend: "Crescente",
            riskLevel: "Alto",
            lastMeasurement: "30 segundos atrás"
        }
    };

    const dataStr = JSON.stringify(patientData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `maria_silva_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Função para imprimir relatório
function printReport() {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
                <html>
                <head>
                    <title>Relatório - Maria Silva</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 20px; }
                        .section { margin-bottom: 20px; }
                        .critical { color: #dc2626; font-weight: bold; }
                        .warning { color: #f59e0b; font-weight: bold; }
                        .normal { color: #059669; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Relatório Médico - Fio Vital Pro</h1>
                        <h2>Paciente: Maria Silva (ID: #FV001)</h2>
                        <p>Data/Hora: ${new Date().toLocaleString('pt-BR')}</p>
                        <p>Dr. João Santos - Cardiologista</p>
                    </div>
                    
                    <div class="section">
                        <h3>Status Atual</h3>
                        <p><strong>Condição:</strong> <span class="critical">CRÍTICA</span></p>
                        <p><strong>Frequência Cardíaca:</strong> <span class="critical">125 BPM</span></p>
                        <p><strong>Tendência:</strong> <span class="warning">Crescente</span></p>
                        <p><strong>Localização:</strong> Rua das Flores, 123 - Centro</p>
                    </div>
                    
                    <div class="section">
                        <h3>Dados do Paciente</h3>
                        <p><strong>Idade:</strong> 68 anos</p>
                        <p><strong>Sexo:</strong> Feminino</p>
                        <p><strong>Tipo Sanguíneo:</strong> O+</p>
                        <p><strong>Contato:</strong> (11) 99999-9999</p>
                        <p><strong>Emergência:</strong> João Silva (Filho)</p>
                    </div>
                    
                    <div class="section">
                        <h3>Recomendações</h3>
                        <ul>
                            <li>Monitoramento contínuo necessário</li>
                            <li>Considerar consulta presencial urgente</li>
                            <li>Verificar aderência à medicação</li>
                            <li>Orientar repouso e evitar esforços</li>
                        </ul>
                    </div>
                    
                    <div class="section">
                        <p><em>Este relatório foi gerado automaticamente pelo sistema Fio Vital Pro.</em></p>
                    </div>
                </body>
                </html>
            `);
    printWindow.document.close();
    printWindow.print();
}

// Substituir a função shareData existente
function shareData() {
    const options = [
        '1. 📧 Enviar por Email',
        '2. 💾 Exportar JSON',
        '3. 🖨️ Imprimir Relatório',
        '4. 📱 Compartilhar via WhatsApp'
    ];

    const choice = prompt('Como deseja compartilhar os dados?\n\n' + options.join('\n') + '\n\nDigite o número da opção:');

    switch (choice) {
        case '1':
            window.location.href = 'mailto:?subject=Relatório - Maria Silva&body=Segue em anexo o relatório da paciente Maria Silva (ID: #FV001)';
            break;
        case '2':
            exportPatientData();
            break;
        case '3':
            printReport();
            break;
        case '4':
            sendWhatsAppMessage('checkup');
            break;
        default:
            alert('Opção inválida.');
    }
}

// Atualizar a função do WhatsApp para mostrar opções
document.addEventListener('DOMContentLoaded', function () {
    const whatsappBtn = document.querySelector('.action-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.onclick = function (e) {
            e.preventDefault();
            showWhatsAppOptions();
        };
    }
});

// Iniciar simulações quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    // Atualizar sinais vitais a cada 10 segundos
    setInterval(updateVitalSigns, 10000);

    // Simular novos alertas a cada 30 segundos
    setInterval(simulateAlerts, 30000);

    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification('Fio Vital Pro', {
                body: 'Monitorando Maria Silva - Status crítico detectado',
                icon: '💗'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Fio Vital Pro', {
                        body: 'Notificações ativadas para Maria Silva',
                        icon: '💗'
                    });
                }
            });
        }
    }, 2000);
});

// Função para alternar entre temas (modo escuro)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência de tema salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Adicionar atalhos de teclado
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                sendNotification();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('.action-btn.call').click();
                break;
            case '3':
                e.preventDefault();
                showWhatsAppOptions();
                break;
            case '4':
                e.preventDefault();
                callEmergency();
                break;
            case 'p':
                e.preventDefault();
                printReport();
                break;
        }
    }
});