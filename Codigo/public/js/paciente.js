// paciente.js — Cadastro + Painel do Paciente
(function() {
  const API_BASE = 'http://localhost:4567';

  // ========== Utilitários ==========
  function salvarSessao(paciente) {
    localStorage.setItem("paciente", JSON.stringify(paciente));
    localStorage.setItem("pacienteId", paciente.id);
    localStorage.setItem("pacienteEmail", paciente.email);
  }

  function obterSessao() {
    const p = localStorage.getItem("paciente");
    return p ? JSON.parse(p) : null;
  }

  function handleFatal(msg) {
    console.error(msg);
    alert("Sessão expirada ou erro: " + msg);
    window.location.href = "../views/login.html";
  }

  // ========== Cadastro ==========
  const form = document.getElementById('form-paciente');
  if (form) {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const dataNascimentoInput = document.getElementById('dataNascimento');
    const historicoMedicoInput = document.getElementById('historicoMedico');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (senhaInput.value !== confirmarSenhaInput.value) {
        alert('As senhas não conferem!');
        return;
      }

      const paciente = {
        nome: nomeInput.value.trim(),
        email: emailInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        dataNascimento: dataNascimentoInput?.value.trim() || '',
        historicoMedico: historicoMedicoInput.value.trim(),
        senha: senhaInput.value.trim()
      };

      try {
        const res = await fetch(`${API_BASE}/paciente`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paciente)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.erro || "Erro no cadastro");

        const id = data.pacienteId || data.id || null;
        if (!id) throw new Error("Backend não retornou ID do paciente");

        salvarSessao({ ...paciente, id });

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../views/paciente.html";

      } catch (err) {
        console.error("Erro ao cadastrar paciente:", err);
        alert("Erro ao cadastrar paciente: " + err.message);
      }
    });
  }

  // ========== Painel do Paciente ==========
  document.addEventListener('DOMContentLoaded', async () => {
    const nomeContainer = document.querySelector('.user-details h3');
    const emailContainer = document.querySelector('.user-details p');
    const btnLogout = document.querySelector('.logout-btn');

    if (btnLogout) btnLogout.addEventListener('click', logout);

    // Se não existir painel (ex: página de cadastro), sai
    if (!nomeContainer && !emailContainer) return;

    const sessao = obterSessao();
    if (!sessao) return handleFatal("Sessão expirada.");

    try {
      const res = await fetch(`${API_BASE}/paciente/${sessao.id}`);
      const data = await res.json();

      const pacienteAtual = (res.ok && data.paciente) ? data.paciente : sessao;
      atualizarHeader(pacienteAtual);
      salvarSessao(pacienteAtual);

    } catch (err) {
      console.error("Falha ao buscar dados do paciente:", err);
      atualizarHeader(sessao);
    }

    function atualizarHeader(paciente) {
      if (nomeContainer) nomeContainer.textContent = paciente.nome || "Paciente";
      if (emailContainer) emailContainer.textContent = paciente.email || "";
    }
  });

  // ========== Logout ==========
  function logout() {
    localStorage.removeItem("paciente");
    localStorage.removeItem("pacienteId");
    localStorage.removeItem("pacienteEmail");
    window.location.href = "../views/login.html";
  }

})();



// ============================
// ======== BPM SIMULAÇÃO =====
// ============================

// let currentBPM = 72;
// let chartData = [];

// function generateInitialData() {
//     const now = new Date();
//     chartData = [];
//     for (let i = 23; i >= 0; i--) {
//         const time = new Date(now - i * 60 * 60 * 1000);
//         const bpm = 65 + Math.random() * 20 + Math.sin(i * 0.5) * 10;
//         chartData.push({
//             time: time,
//             bpm: Math.round(bpm)
//         });
//     }
// }

// function updateBPM() {
//     if (!pacienteSelecionado) return;

//     const variation = (Math.random() - 0.5) * 6;
//     currentBPM = Math.max(50, Math.min(120, currentBPM + variation));

//     pacienteSelecionado.bpm = Math.round(currentBPM);
//     pacienteSelecionado.ultimaMedicao = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
//     pacienteSelecionado.tendencia = variation > 0 ? 'Subindo' : (variation < 0 ? 'Descendo' : 'Estável');

//     elementos.bpmAtual.textContent = pacienteSelecionado.bpm + " BPM";
//     elementos.ultimaMedicao.textContent = pacienteSelecionado.ultimaMedicao;
//     elementos.tendencia.textContent = pacienteSelecionado.tendencia;

//     chartData.push({ time: new Date(), bpm: pacienteSelecionado.bpm });
//     if (chartData.length > 24) chartData.shift();
//     drawChart();

//     enviarPacienteParaBackend(pacienteSelecionado);
// }

// function drawChart() {
//     const canvas = document.getElementById('heartRateChart');
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     if (chartData.length === 0) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const padding = 40;
//     const chartWidth = canvas.width - padding * 2;
//     const chartHeight = canvas.height - padding * 2;

//     const bpmValues = chartData.map(d => d.bpm);
//     const minBPM = Math.min(...bpmValues) - 5;
//     const maxBPM = Math.max(...bpmValues) + 5;

//     ctx.strokeStyle = '#e0e0e0';
//     ctx.lineWidth = 1;
//     for (let i = 0; i <= 5; i++) {
//         const y = padding + (chartHeight / 5) * i;
//         ctx.beginPath();
//         ctx.moveTo(padding, y);
//         ctx.lineTo(padding + chartWidth, y);
//         ctx.stroke();

//         const value = Math.round(maxBPM - (maxBPM - minBPM) * (i / 5));
//         ctx.fillStyle = '#666';
//         ctx.font = '12px Arial';
//         ctx.textAlign = 'right';
//         ctx.fillText(value + ' BPM', padding - 10, y + 4);
//     }

//     ctx.strokeStyle = '#c62828';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     chartData.forEach((point, index) => {
//         const x = padding + (chartWidth / (chartData.length - 1)) * index;
//         const y = padding + chartHeight - ((point.bpm - minBPM) / (maxBPM - minBPM)) * chartHeight;
//         if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
//     });
//     ctx.stroke();

//     ctx.fillStyle = '#c62828';
//     chartData.forEach((point, index) => {
//         const x = padding + (chartWidth / (chartData.length - 1)) * index;
//         const y = padding + chartHeight - ((point.bpm - minBPM) / (maxBPM - minBPM)) * chartHeight;
//         ctx.beginPath();
//         ctx.arc(x, y, 4, 0, 2 * Math.PI);
//         ctx.fill();
//     });

//     ctx.fillStyle = '#666';
//     ctx.font = '12px Arial';
//     ctx.textAlign = 'center';
//     for (let i = 0; i < chartData.length; i += 4) {
//         const x = padding + (chartWidth / (chartData.length - 1)) * i;
//         const time = chartData[i].time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
//         ctx.fillText(time, x, canvas.height - 10);
//     }
// }

// // document.querySelectorAll('.time-filter').forEach(button => {
// //     button.addEventListener('click', function () {
// //         document.querySelectorAll('.time-filter').forEach(btn => btn.classList.remove('active'));
// //         this.classList.add('active');
// //         console.log('Selected period:', this.dataset.period);
// //     });
// // });

// // generateInitialData();
// // drawChart();
// // setInterval(updateBPM, 5000);
// // window.addEventListener('resize', () => setTimeout(drawChart, 100));
