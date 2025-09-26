let pacientes = [
    { 
        id: 1, 
        nome: "Maria Silva", 
        idade: 85, 
        condicao: "Hipertensão",
        telefone: "(11) 9999-9999",
        status: "Crítico", 
        bpm: 123, 
        endereco: "Rua das Flores, 123 - Centro", 
        coordenadas: "-25.535 / -46.632", 
        ultimaMedicao: "10:30",
        tendencia: "Subindo",
        ultimaAvaliacao: "Hoje 09:15",
        alertas: ["BPM crítico: 111", "BPM crítico: 114", "BPM crítico: 112"] 
    },
    { 
        id: 2, 
        nome: "Carlos Oliveira", 
        idade: 59, 
        condicao: "Arritmia Cardíaca",
        telefone: "(11) 8888-8888",
        status: "Perigo", 
        bpm: 105, 
        endereco: "Av. Principal, 456 - Centro", 
        coordenadas: "-25.540 / -46.630",
        ultimaMedicao: "10:25",
        tendencia: "Estável",
        ultimaAvaliacao: "Hoje 08:45",
        alertas: ["BPM elevado: 105"] 
    },
    { 
        id: 3, 
        nome: "Ana Costa", 
        idade: 72, 
        condicao: "Diabetes Mellitus Tipo 2",
        telefone: "(11) 7777-7777",
        status: "Normal", 
        bpm: 96, 
        endereco: "Rua Secundária, 789 - Bairro", 
        coordenadas: "-25.538 / -46.628",
        ultimaMedicao: "10:20",
        tendencia: "Descendo",
        ultimaAvaliacao: "Ontem 16:30",
        alertas: [] 
    }
];

let pacienteSelecionado = null;
let proximoId = 4;

const elementos = {
    listaPacientes: document.getElementById('gc-lista-pacientes'),
    nomePaciente: document.getElementById('gc-nome-paciente'),
    infoPaciente: document.getElementById('gc-info-paciente'),
    detalhesPaciente: document.getElementById('gc-detalhes-paciente'),
    bpmAtual: document.getElementById('gc-bpm-atual'),
    ultimaMedicao: document.getElementById('gc-ultima-medicao'),
    tendencia: document.getElementById('gc-tendencia'),
    enderecoPaciente: document.getElementById('gc-endereco-paciente'),
    coordenadasPaciente: document.getElementById('gc-coordenadas-paciente'),
    ultimaAvaliacao: document.getElementById('gc-ultima-avaliacao'),
    listaAlertas: document.getElementById('gc-lista-alertas'),
    modal: document.getElementById('gc-modal-cadastro')
};

document.addEventListener('DOMContentLoaded', function() {
    carregarPacientes();
    
    if (!elementos.modal) {
        criarModalCadastro();
    }
});

function carregarPacientes() {
    elementos.listaPacientes.innerHTML = '';
    
    pacientes.forEach(paciente => {
        const li = document.createElement('li');
        li.onclick = () => selecionarPaciente(paciente.id);
        li.innerHTML = `
            <p><b>${paciente.nome}</b></p>
            <p>Idade: ${paciente.idade} anos</p>
            <p class="paciente-condicao">${paciente.condicao}</p>
            <p>${paciente.bpm} BPM <span class="paciente-status status-${getStatusClass(paciente.status)}">${paciente.status}</span></p>
            <div style="display:flex; justify-content:space-between; margin-top:8px;">
                <button class="gc-btn-update" onclick="event.stopPropagation(); editarPaciente(${paciente.id})">Editar</button>
                <button class="gc-btn-remove" onclick="event.stopPropagation(); removerPaciente(${paciente.id})">Remover</button>
            </div>
        `;
        elementos.listaPacientes.appendChild(li);
    });
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'normal': return 'normal';
        case 'perigo': return 'perigo';
        case 'crítico': return 'critico';
        default: return 'normal';
    }
}

function selecionarPaciente(id) {
    pacienteSelecionado = pacientes.find(p => p.id === id);
    
    document.querySelectorAll('#gc-lista-pacientes li').forEach(li => {
        li.classList.remove('active');
    });
    
    const itemSelecionado = Array.from(document.querySelectorAll('#gc-lista-pacientes li'))
        .find(li => li.textContent.includes(pacienteSelecionado.nome));
    if (itemSelecionado) {
        itemSelecionado.classList.add('active');
    }
    
    elementos.nomePaciente.textContent = pacienteSelecionado.nome;
    elementos.infoPaciente.textContent = `ID: #PV${id.toString().padStart(3, '0')} — ${pacienteSelecionado.condicao}`;
    elementos.bpmAtual.textContent = `${pacienteSelecionado.bpm} BPM`;
    elementos.ultimaMedicao.textContent = pacienteSelecionado.ultimaMedicao;
    elementos.tendencia.textContent = pacienteSelecionado.tendencia;
    elementos.enderecoPaciente.textContent = pacienteSelecionado.endereco;
    elementos.coordenadasPaciente.textContent = `Coordenadas: ${pacienteSelecionado.coordenadas}`;
    elementos.ultimaAvaliacao.textContent = pacienteSelecionado.ultimaAvaliacao;

    elementos.listaAlertas.innerHTML = '';
    pacienteSelecionado.alertas.forEach(alerta => {
        const li = document.createElement('li');
        li.textContent = alerta;
        elementos.listaAlertas.appendChild(li);
    });

    elementos.detalhesPaciente.style.display = "block";
}

function filtrarPacientes(termo) {
    const itens = elementos.listaPacientes.getElementsByTagName('li');
    
    for (let i = 0; i < itens.length; i++) {
        const texto = itens[i].textContent.toLowerCase();
        if (texto.includes(termo.toLowerCase())) {
            itens[i].style.display = "";
        } else {
            itens[i].style.display = "none";
        }
    }
}

function adicionarPaciente() {
    abrirModalCadastro();
}

function editarPaciente(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (paciente) {
        abrirModalCadastro(paciente);
    }
}

function removerPaciente(id) {
    if (confirm('Tem certeza que deseja remover este paciente?')) {
        pacientes = pacientes.filter(p => p.id !== id);
        carregarPacientes();
        
        if (pacienteSelecionado && pacienteSelecionado.id === id) {
            pacienteSelecionado = null;
            elementos.detalhesPaciente.style.display = "none";
            elementos.nomePaciente.textContent = "Selecione um paciente";
            elementos.infoPaciente.textContent = "Clique em um paciente da lista para ver os detalhes";
        }
        
        alert('Paciente removido com sucesso!');
    }
}

function criarModalCadastro() {
    const modal = document.createElement('div');
    modal.id = 'gc-modal-cadastro';
    modal.className = 'gc-modal';
    modal.innerHTML = `
        <div class="gc-modal-content">
            <h3 id="gc-modal-titulo">Adicionar Paciente</h3>
            <form id="gc-form-paciente">
                <div class="gc-form-group">
                    <label for="gc-nome">Nome Completo *</label>
                    <input type="text" id="gc-nome" required placeholder="Ex: João da Silva">
                </div>
                <div class="gc-form-group">
                    <label for="gc-idade">Idade *</label>
                    <input type="number" id="gc-idade" min="1" max="120" required placeholder="Ex: 65">
                </div>
                <div class="gc-form-group">
                    <label for="gc-condicao">Condição Principal *</label>
                    <input type="text" id="gc-condicao" required placeholder="Ex: Hipertensão Arterial, Diabetes, etc.">
                </div>
                <div class="gc-form-group">
                    <label for="gc-telefone">Telefone *</label>
                    <input type="tel" id="gc-telefone" placeholder="(11) 99999-9999" required>
                </div>
                <div class="gc-modal-actions">
                    <button type="button" class="gc-btn-cancelar" onclick="fecharModalCadastro()">Cancelar</button>
                    <button type="submit" class="gc-btn-salvar">Salvar Paciente</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('gc-form-paciente').addEventListener('submit', function(e) {
        e.preventDefault();
        salvarPaciente();
    });

    document.getElementById('gc-telefone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d{0,2})/, '($1');
        }
        
        e.target.value = value;
    });
}

function abrirModalCadastro(paciente = null) {
    const modal = document.getElementById('gc-modal-cadastro');
    const titulo = document.getElementById('gc-modal-titulo');
    const form = document.getElementById('gc-form-paciente');
    
    if (paciente) {
        titulo.textContent = 'Editar Paciente';
        document.getElementById('gc-nome').value = paciente.nome;
        document.getElementById('gc-idade').value = paciente.idade;
        document.getElementById('gc-condicao').value = paciente.condicao;
        document.getElementById('gc-telefone').value = paciente.telefone;
        form.dataset.editId = paciente.id;
    } else {
        titulo.textContent = 'Adicionar Paciente';
        form.reset();
        delete form.dataset.editId;
    }
    
    modal.style.display = 'flex';
    document.getElementById('gc-nome').focus();
}

function fecharModalCadastro() {
    document.getElementById('gc-modal-cadastro').style.display = 'none';
}

function salvarPaciente() {
    const form = document.getElementById('gc-form-paciente');
    const isEdit = form.dataset.editId;
    
    const nome = document.getElementById('gc-nome').value.trim();
    const idade = parseInt(document.getElementById('gc-idade').value);
    const condicao = document.getElementById('gc-condicao').value.trim();
    const telefone = document.getElementById('gc-telefone').value.trim();
    
    if (!nome || !idade || !condicao || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (idade < 1 || idade > 120) {
        alert('Por favor, insira uma idade válida (1-120 anos).');
        return;
    }
    
    if (telefone.replace(/\D/g, '').length < 10) {
        alert('Por favor, insira um telefone válido.');
        return;
    }
    
    if (condicao.length < 3) {
        alert('Por favor, insira uma condição médica válida (mínimo 3 caracteres).');
        return;
    }
    
    const novoPaciente = {
        nome: nome,
        idade: idade,
        condicao: condicao,
        telefone: telefone,
        status: 'Normal',
        bpm: Math.floor(Math.random() * 40) + 60,
        endereco: "Endereço a ser cadastrado",
        coordenadas: "-25.000 / -47.000",
        ultimaMedicao: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
        tendencia: 'Estável',
        ultimaAvaliacao: 'Agora',
        alertas: []
    };
    
    if (isEdit) {
        const index = pacientes.findIndex(p => p.id === parseInt(isEdit));
        if (index !== -1) {
            novoPaciente.id = parseInt(isEdit);
            pacientes[index] = novoPaciente;
        }
    } else {
        novoPaciente.id = proximoId++;
        pacientes.push(novoPaciente);
    }
    
    carregarPacientes();
    fecharModalCadastro();
    
    selecionarPaciente(novoPaciente.id);
    
    alert(`Paciente ${isEdit ? 'editado' : 'adicionado'} com sucesso!`);
}

function logout() { 
    if (confirm('Deseja sair?')) location.href = 'login.html'; 
}

function centralizarMapa() { 
    alert('Mapa centralizado'); 
}

function atualizarMapa() { 
    alert('Mapa atualizado'); 
}

function acionarEmergencia() { 
    if (pacienteSelecionado) {
        if (confirm(`Acionar emergência para ${pacienteSelecionado.nome}?`)) {
            alert(`Emergência acionada para ${pacienteSelecionado.nome}! Serviços de emergência notificados.`);
        }
    } else {
        alert('Selecione um paciente primeiro!');
    }
}

function ligarPaciente() { 
    if (pacienteSelecionado) {
        alert(`Ligando para ${pacienteSelecionado.nome} (${pacienteSelecionado.telefone})`);
    } else {
        alert('Selecione um paciente primeiro!');
    }
}

function enviarMensagem() { 
    if (pacienteSelecionado) {
        const mensagem = prompt(`Digite a mensagem para ${pacienteSelecionado.nome}:`);
        if (mensagem) {
            alert(`Mensagem enviada para ${pacienteSelecionado.nome}: "${mensagem}"`);
        }
    } else {
        alert('Selecione um paciente primeiro!');
    }
}

function verHistorico() { 
    if (pacienteSelecionado) {
        alert(`Abrindo histórico de ${pacienteSelecionado.nome}`);
    } else {
        alert('Selecione um paciente primeiro!');
    }
}

function maisInformacoes() { 
    if (pacienteSelecionado) {
        alert(`Mais informações de ${pacienteSelecionado.nome}`);
    } else {
        alert('Selecione um paciente primeiro!');
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('gc-modal-cadastro');
    if (e.target === modal) {
        fecharModalCadastro();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModalCadastro();
    }
});