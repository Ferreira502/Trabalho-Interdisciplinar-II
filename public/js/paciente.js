document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const elements = {
        // Lista de pacientes
        searchPacientes: document.getElementById('search-pacientes'),
        pacientesContainer: document.querySelector('.pacientes-container'),
        addPacienteBtn: document.getElementById('add-paciente'),
        
        // Detalhes do paciente
        pacienteNome: document.getElementById('paciente-nome'),
        pacienteInfo: document.getElementById('paciente-info'),
        currentBpm: document.getElementById('current-bpm'),
        avgBpm: document.getElementById('avg-bpm'),
        batteryLevel: document.getElementById('battery-level'),
        heartRateChart: document.getElementById('heartRateChart'),
        alertsContainer: document.getElementById('alerts-container'),
        editPacienteBtn: document.getElementById('edit-paciente'),
        emergencyPacienteBtn: document.getElementById('emergency-paciente'),
        
        // Modais
        emergencyModal: document.getElementById('emergency-modal'),
        emergencyPacienteNome: document.getElementById('emergency-paciente-nome'),
        emergencyBpm: document.getElementById('emergency-bpm'),
        countdown: document.getElementById('countdown'),
        cancelEmergency: document.getElementById('cancel-emergency'),
        confirmEmergency: document.getElementById('confirm-emergency'),
        
        addPacienteModal: document.getElementById('add-paciente-modal'),
        pacienteForm: document.getElementById('paciente-form'),
        cancelAddPaciente: document.getElementById('cancel-add-paciente'),
        savePaciente: document.getElementById('save-paciente'),
        
        // Footer
        connectionStatus: document.getElementById('connection-status'),
        lastUpdate: document.getElementById('last-update')
    };

    // Estado da aplicação
    const state = {
        pacientes: [
            {
                id: 1,
                nome: 'Maria Silva',
                idade: 65,
                condicao: 'Hipertensão',
                telefone: '(11) 99999-9999',
                cidade: 'São Paulo, SP',
                codigo: 'P-001',
                bpmAtual: 72,
                bpmMedio: 68,
                bateria: 85,
                status: 'normal',
                medicamentos: [
                    { nome: 'Captopril', dosagem: '25mg', horarios: ['8h', '14h', '20h'] },
                    { nome: 'AAS', dosagem: '100mg', horarios: ['8h'] }
                ],
                condicoes: ['Hipertensão Arterial', 'Dislipidemia', 'Obesidade Grau I'],
                consulta: {
                    medico: 'Dr. Carlos Ferreira',
                    data: '15/12/2023',
                    horario: '14:30',
                    local: 'Cardiologia - Hospital São Lucas'
                },
                historicoBpm: [65, 62, 68, 75, 72, 70],
                alertas: [
                    {
                        tipo: 'normal',
                        titulo: 'Batimentos Normalizados',
                        mensagem: '15:30 - Frequência cardíaca retornou ao normal',
                        timestamp: new Date('2023-01-01T15:30:00')
                    }
                ]
            },
            {
                id: 2,
                nome: 'João Santos',
                idade: 58,
                condicao: 'Arritmia',
                telefone: '(11) 98888-8888',
                cidade: 'São Paulo, SP',
                codigo: 'P-002',
                bpmAtual: 88,
                bpmMedio: 82,
                bateria: 45,
                status: 'warning',
                medicamentos: [
                    { nome: 'Amiodarona', dosagem: '200mg', horarios: ['12h'] },
                    { nome: 'Losartana', dosagem: '50mg', horarios: ['8h'] }
                ],
                condicoes: ['Arritmia Cardíaca', 'Hipertensão'],
                consulta: {
                    medico: 'Dra. Ana Costa',
                    data: '20/12/2023',
                    horario: '10:00',
                    local: 'Cardiologia - Hospital Albert Einstein'
                },
                historicoBpm: [78, 82, 85, 88, 86, 84],
                alertas: [
                    {
                        tipo: 'warning',
                        titulo: 'Frequência Elevada',
                        mensagem: '14:15 - 92 BPM detectados',
                        timestamp: new Date('2023-01-01T14:15:00')
                    }
                ]
            },
            {
                id: 3,
                nome: 'Ana Oliveira',
                idade: 72,
                condicao: 'Diabetes',
                telefone: '(11) 97777-7777',
                cidade: 'São Paulo, SP',
                codigo: 'P-003',
                bpmAtual: 68,
                bpmMedio: 65,
                bateria: 92,
                status: 'normal',
                medicamentos: [
                    { nome: 'Metformina', dosagem: '850mg', horarios: ['8h', '20h'] },
                    { nome: 'Insulina', dosagem: '20UI', horarios: ['8h'] }
                ],
                condicoes: ['Diabetes Tipo 2', 'Hipertensão'],
                consulta: {
                    medico: 'Dr. Roberto Almeida',
                    data: '18/12/2023',
                    horario: '16:00',
                    local: 'Endocrinologia - Hospital Sírio-Libanês'
                },
                historicoBpm: [62, 65, 68, 70, 68, 66],
                alertas: [
                    {
                        tipo: 'info',
                        titulo: 'Relatório Diário',
                        mensagem: '08:00 - Relatório de atividades gerado',
                        timestamp: new Date('2023-01-01T08:00:00')
                    }
                ]
            },
            {
                id: 4,
                nome: 'Carlos Mendes',
                idade: 45,
                condicao: 'Pós-operatório',
                telefone: '(11) 96666-6666',
                cidade: 'São Paulo, SP',
                codigo: 'P-004',
                bpmAtual: 102,
                bpmMedio: 85,
                bateria: 23,
                status: 'danger',
                medicamentos: [
                    { nome: 'Analgésico', dosagem: '500mg', horarios: ['6h', '14h', '22h'] },
                    { nome: 'Antibiótico', dosagem: '500mg', horarios: ['8h', '20h'] }
                ],
                condicoes: ['Pós-operatório Cardíaco'],
                consulta: {
                    medico: 'Dr. Fernando Lima',
                    data: '12/12/2023',
                    horario: '09:00',
                    local: 'Cardiologia - Hospital das Clínicas'
                },
                historicoBpm: [95, 98, 102, 105, 100, 98],
                alertas: [
                    {
                        tipo: 'danger',
                        titulo: 'Frequência Crítica',
                        mensagem: '16:20 - 105 BPM detectados',
                        timestamp: new Date('2023-01-01T16:20:00')
                    }
                ]
            }
        ],
        pacienteSelecionado: null,
        chart: null,
        isEmergencyActive: false,
        emergencyCountdown: null,
        connectionOnline: true
    };

    // Inicialização
    init();

    function goBack() {
        window.history.back();
    }


    function init() {
        renderPacientesList();
        selecionarPaciente(1); // Selecionar primeiro paciente por padrão
        setupEventListeners();
        startSimulations();
        updateConnectionStatus();
    }

    function renderPacientesList() {
        const container = elements.pacientesContainer;
        container.innerHTML = '';

        state.pacientes.forEach(paciente => {
            const pacienteElement = createPacienteElement(paciente);
            container.appendChild(pacienteElement);
        });
    }

    function createPacienteElement(paciente) {
        const item = document.createElement('div');
        item.className = `paciente-item ${state.pacienteSelecionado?.id === paciente.id ? 'active' : ''}`;
        item.setAttribute('data-paciente-id', paciente.id);
        
        const statusIcon = paciente.status === 'normal' ? 'fa-heart' : 
                          paciente.status === 'warning' ? 'fa-exclamation-triangle' : 'fa-heartbeat';

        item.innerHTML = `
            <div class="paciente-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="paciente-info">
                <h3>${paciente.nome}</h3>
                <p>${paciente.idade} anos • ${paciente.condicao}</p>
                <div class="paciente-status ${paciente.status}">
                    <i class="fas ${statusIcon}"></i>
                    <span>${paciente.bpmAtual} BPM</span>
                </div>
            </div>
            <button class="btn btn-small view-paciente" aria-label="Ver detalhes de ${paciente.nome}">
                Ver
            </button>
        `;

        // Event listeners
        item.addEventListener('click', () => selecionarPaciente(paciente.id));
        item.querySelector('.view-paciente').addEventListener('click', (e) => {
            e.stopPropagation();
            selecionarPaciente(paciente.id);
        });

        return item;
    }

    function selecionarPaciente(pacienteId) {
        const paciente = state.pacientes.find(p => p.id === pacienteId);
        if (!paciente) return;

        state.pacienteSelecionado = paciente;

        // Atualizar lista de pacientes
        document.querySelectorAll('.paciente-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.getAttribute('data-paciente-id')) === pacienteId) {
                item.classList.add('active');
            }
        });

        // Atualizar detalhes do paciente
        updatePacienteDetails(paciente);
    }

    function updatePacienteDetails(paciente) {
        // Informações básicas
        elements.pacienteNome.textContent = paciente.nome;
        elements.pacienteInfo.textContent = `${paciente.idade} anos • ${paciente.condicao} • ID: ${paciente.codigo}`;
        
        // Atualizar informações de contato
        const contatoElement = document.querySelector('.paciente-contato');
        contatoElement.innerHTML = `
            <span><i class="fas fa-phone"></i> ${paciente.telefone}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${paciente.cidade}</span>
        `;

        // Estatísticas
        elements.currentBpm.textContent = paciente.bpmAtual;
        elements.avgBpm.textContent = paciente.bpmMedio;
        elements.batteryLevel.textContent = `${paciente.bateria}%`;

        // Atualizar gráfico
        updateChart(paciente);

        // Atualizar alertas
        renderAlerts(paciente.alertas);

        // Atualizar informações médicas
        updateMedicalInfo(paciente);

        // Atualizar modal de emergência
        elements.emergencyPacienteNome.textContent = paciente.nome;
        elements.emergencyBpm.textContent = paciente.bpmAtual;
    }

    function updateChart(paciente) {
        const ctx = elements.heartRateChart.getContext('2d');
        
        // Destruir gráfico anterior se existir
        if (state.chart) {
            state.chart.destroy();
        }

        const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
        
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Batimentos por minuto (BPM)',
                    data: paciente.historicoBpm,
                    backgroundColor: 'rgba(44, 90, 160, 0.2)',
                    borderColor: 'rgba(44, 90, 160, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(44, 90, 160, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' BPM';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMin: 50,
                        suggestedMax: 120,
                        ticks: {
                            callback: function(value) {
                                return value + ' BPM';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };

        state.chart = new Chart(ctx, config);
    }

    function renderAlerts(alertas) {
        const container = elements.alertsContainer;
        container.innerHTML = '';

        alertas.forEach(alerta => {
            const alertElement = createAlertElement(alerta);
            container.appendChild(alertElement);
        });
    }

    function createAlertElement(alerta) {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alerta.tipo}`;
        
        const iconClass = alerta.tipo === 'normal' ? 'fa-check-circle' :
                         alerta.tipo === 'warning' ? 'fa-exclamation-triangle' :
                         alerta.tipo === 'danger' ? 'fa-heartbeat' : 'fa-info-circle';

        alertItem.innerHTML = `
            <div class="alert-icon" aria-hidden="true">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="alert-content">
                <h4>${alerta.titulo}</h4>
                <p>${alerta.mensagem}</p>
            </div>
        `;

        return alertItem;
    }

    function updateMedicalInfo(paciente) {
        // Atualizar medicamentos
        const medList = document.querySelector('.medication-list');
        medList.innerHTML = paciente.medicamentos.map(med => `
            <div class="medication-item">
                <span class="med-name">${med.nome}</span>
                <span class="med-dosage">${med.dosage}</span>
                <span class="med-schedule">${med.horarios.join(' • ')}</span>
            </div>
        `).join('');

        // Atualizar condições
        const conditionsList = document.querySelector('.conditions-list');
        conditionsList.innerHTML = paciente.condicoes.map(condicao => 
            `<li>${condicao}</li>`
        ).join('');

        // Atualizar consulta
        const appointmentInfo = document.querySelector('.appointment-info');
        appointmentInfo.innerHTML = `
            <p><strong>${paciente.consulta.medico}</strong></p>
            <p>${paciente.consulta.data} às ${paciente.consulta.horario}</p>
            <p>${paciente.consulta.local}</p>
        `;
    }

    function setupEventListeners() {
        // Busca de pacientes
        elements.searchPacientes.addEventListener('input', filtrarPacientes);
        
        // Botão adicionar paciente
        elements.addPacienteBtn.addEventListener('click', showAddPacienteModal);
        
        // Ações do paciente
        elements.editPacienteBtn.addEventListener('click', editarPaciente);
        elements.emergencyPacienteBtn.addEventListener('click', handleEmergencyClick);
        
        // Modal de emergência
        elements.cancelEmergency.addEventListener('click', cancelEmergency);
        elements.confirmEmergency.addEventListener('click', confirmEmergency);
        
        // Modal adicionar paciente
        elements.cancelAddPaciente.addEventListener('click', hideAddPacienteModal);
        elements.savePaciente.addEventListener('click', salvarPaciente);
        
        // Teclado para acessibilidade
        document.addEventListener('keydown', handleKeyPress);
    }

    function filtrarPacientes() {
        const termo = elements.searchPacientes.value.toLowerCase();
        
        state.pacientes.forEach(paciente => {
            const elemento = document.querySelector(`[data-paciente-id="${paciente.id}"]`);
            if (elemento) {
                const corresponde = paciente.nome.toLowerCase().includes(termo) ||
                                  paciente.condicao.toLowerCase().includes(termo);
                elemento.style.display = corresponde ? 'flex' : 'none';
            }
        });
    }

    function showAddPacienteModal() {
        elements.addPacienteModal.classList.add('show');
        elements.addPacienteModal.setAttribute('aria-hidden', 'false');
    }

    function hideAddPacienteModal() {
        elements.addPacienteModal.classList.remove('show');
        elements.addPacienteModal.setAttribute('aria-hidden', 'true');
        elements.pacienteForm.reset();
    }

    function salvarPaciente() {
        const nome = document.getElementById('paciente-nome-input').value;
        const idade = document.getElementById('paciente-idade').value;
        const condicao = document.getElementById('paciente-condicao').value;
        const telefone = document.getElementById('paciente-telefone').value;

        if (!nome || !idade || !condicao || !telefone) {
            showNotification('warning', 'Campos obrigatórios', 'Preencha todos os campos obrigatórios.');
            return;
        }

        const novoPaciente = {
            id: Math.max(...state.pacientes.map(p => p.id)) + 1,
            nome,
            idade: parseInt(idade),
            condicao,
            telefone,
            cidade: 'São Paulo, SP',
            codigo: `P-${String(Math.max(...state.pacientes.map(p => parseInt(p.codigo.split('-')[1]))) + 1).padStart(3, '0')}`,
            bpmAtual: 72,
            bpmMedio: 68,
            bateria: 100,
            status: 'normal',
            medicamentos: [],
            condicoes: [condicao],
            consulta: {
                medico: 'A definir',
                data: 'A agendar',
                horario: 'A definir',
                local: 'A definir'
            },
            historicoBpm: [70, 68, 72, 75, 72, 70],
            alertas: [
                {
                    tipo: 'info',
                    titulo: 'Paciente Adicionado',
                    mensagem: 'Novo paciente cadastrado no sistema',
                    timestamp: new Date()
                }
            ]
        };

        state.pacientes.push(novoPaciente);
        renderPacientesList();
        hideAddPacienteModal();
        
        showNotification('success', 'Paciente Adicionado', `${nome} foi adicionado com sucesso.`);
    }

    function editarPaciente() {
        if (!state.pacienteSelecionado) return;
        
        showNotification('info', 'Editar Paciente', `Editando informações de ${state.pacienteSelecionado.nome}`);
        // Aqui iria a lógica para abrir modal de edição
    }

    function handleEmergencyClick() {
        if (!state.pacienteSelecionado || state.isEmergencyActive) return;
        
        elements.emergencyModal.classList.add('show');
        elements.emergencyModal.setAttribute('aria-hidden', 'false');
        
        startEmergencyCountdown();
    }

    function startEmergencyCountdown() {
        let countdown = 10;
        elements.countdown.textContent = countdown;
        
        state.emergencyCountdown = setInterval(() => {
            countdown--;
            elements.countdown.textContent = countdown;
            
            if (countdown <= 0) {
                confirmEmergency();
            }
        }, 1000);
        
        state.isEmergencyActive = true;
    }

    function cancelEmergency() {
        clearInterval(state.emergencyCountdown);
        elements.emergencyModal.classList.remove('show');
        elements.emergencyModal.setAttribute('aria-hidden', 'true');
        state.isEmergencyActive = false;
        
        if (state.pacienteSelecionado) {
            addAlert(state.pacienteSelecionado.id, 'info', 'Emergência Cancelada', 'Chamada de emergência cancelada pelo usuário');
        }
    }

    function confirmEmergency() {
        clearInterval(state.emergencyCountdown);
        elements.emergencyModal.classList.remove('show');
        elements.emergencyModal.setAttribute('aria-hidden', 'true');
        state.isEmergencyActive = false;
        
        if (state.pacienteSelecionado) {
            simulateEmergencyCall(state.pacienteSelecionado);
            addAlert(state.pacienteSelecionado.id, 'danger', 'Emergência Acionada', 
                `Serviço de emergência notificado - ${state.pacienteSelecionado.bpmAtual} BPM`);
        }
    }

    function simulateEmergencyCall(paciente) {
        console.log(`EMERGÊNCIA: Acionando serviço médico para ${paciente.nome}. Frequência: ${paciente.bpmAtual} BPM`);
        
        showNotification('danger', 'Emergência Acionada', 
            `Serviço médico notificado para ${paciente.nome}. Localização e dados enviados.`);
    }

    function addAlert(pacienteId, tipo, titulo, mensagem) {
        const paciente = state.pacientes.find(p => p.id === pacienteId);
        if (!paciente) return;

        const alerta = {
            tipo,
            titulo,
            mensagem,
            timestamp: new Date()
        };

        paciente.alertas.unshift(alerta);
        
        // Manter apenas os últimos 10 alertas
        if (paciente.alertas.length > 10) {
            paciente.alertas.pop();
        }

        // Se for o paciente selecionado, atualizar a interface
        if (state.pacienteSelecionado?.id === pacienteId) {
            renderAlerts(paciente.alertas);
        }
    }

    function startSimulations() {
        // Simular atualização de dados dos pacientes
        setInterval(() => {
            state.pacientes.forEach(paciente => {
                // Variação aleatória de BPM (-3 a +3)
                const variacao = Math.floor(Math.random() * 7) - 3;
                paciente.bpmAtual = Math.max(40, Math.min(140, paciente.bpmAtual + variacao));
                
                // Atualizar status baseado no BPM
                if (paciente.bpmAtual >= 60 && paciente.bpmAtual <= 80) {
                    paciente.status = 'normal';
                } else if ((paciente.bpmAtual > 80 && paciente.bpmAtual <= 95) || 
                          (paciente.bpmAtual >= 50 && paciente.bpmAtual < 60)) {
                    paciente.status = 'warning';
                    
                    // Chance de gerar alerta
                    if (Math.random() > 0.8) {
                        addAlert(paciente.id, 'warning', 'Frequência Alterada', 
                            `${getCurrentTime()} - ${paciente.bpmAtual} BPM detectados`);
                    }
                } else {
                    paciente.status = 'danger';
                    
                    // Sempre gerar alerta crítico
                    addAlert(paciente.id, 'danger', 'Frequência Crítica', 
                        `${getCurrentTime()} - ${paciente.bpmAtual} BPM detectados`);
                }
                
                // Atualizar bateria (-1% a 0%)
                paciente.bateria = Math.max(0, paciente.bateria - Math.floor(Math.random() * 2));
                
                // Adicionar ao histórico (mantendo apenas últimos 6 valores)
                paciente.historicoBpm.push(paciente.bpmAtual);
                if (paciente.historicoBpm.length > 6) {
                    paciente.historicoBpm.shift();
                }
                
                // Recalcular média
                paciente.bpmMedio = Math.round(paciente.historicoBpm.reduce((a, b) => a + b) / paciente.historicoBpm.length);
            });
            
            // Atualizar interface se necessário
            if (state.pacienteSelecionado) {
                updatePacienteDetails(state.pacienteSelecionado);
            }
            
            // Atualizar lista de pacientes
            renderPacientesList();
            
        }, 10000); // Atualizar a cada 10 segundos

        // Atualizar status da conexão
        setInterval(updateConnectionStatus, 30000);
        
        // Atualizar hora da última atualização
        setInterval(() => {
            elements.lastUpdate.textContent = `Última atualização: ${new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }, 60000);
    }

    function updateConnectionStatus() {
        // Simular status de conexão (95% de chance de estar online)
        state.connectionOnline = Math.random() > 0.05;
        
        if (state.connectionOnline) {
            elements.connectionStatus.innerHTML = '<i class="fas fa-circle"></i> Sistema Online';
            elements.connectionStatus.className = 'status-online';
        } else {
            elements.connectionStatus.innerHTML = '<i class="fas fa-circle"></i> Sistema Offline';
            elements.connectionStatus.className = 'status-offline';
            showNotification('warning', 'Conexão Instável', 'Problemas de conexão detectados');
        }
    }

    function showNotification(tipo, titulo, mensagem) {
        const notification = document.createElement('div');
        notification.className = `notification ${tipo}`;
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${titulo}</h4>
                <p>${mensagem}</p>
            </div>
            <button class="close-notification" aria-label="Fechar notificação">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Fechar notificação após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Botão fechar
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
    }

    function handleKeyPress(event) {
        // Atalhos de teclado para acessibilidade
        if (event.altKey) {
            switch(event.key) {
                case 'a':
                    event.preventDefault();
                    elements.addPacienteBtn.focus();
                    break;
                case 'e':
                    event.preventDefault();
                    elements.emergencyPacienteBtn.focus();
                    break;
                case 's':
                    event.preventDefault();
                    elements.searchPacientes.focus();
                    break;
            }
        }
        
        // ESC fecha modais
        if (event.key === 'Escape') {
            if (state.isEmergencyActive) {
                cancelEmergency();
            }
            if (elements.addPacienteModal.classList.contains('show')) {
                hideAddPacienteModal();
            }
        }
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Funções de debug (apenas em desenvolvimento)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.appState = state;
        window.testAddAlert = (pacienteId, tipo, titulo, mensagem) => addAlert(pacienteId, tipo, titulo, mensagem);
        window.testEmergency = () => handleEmergencyClick();
    }
});