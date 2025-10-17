const API_BASE = 'http://localhost:4567';
const pacientesEncontrados = [];

// =================== Buscar paciente por e-mail ===================
async function buscarPacientePorEmail(email) {
  console.log("buscarPacientePorEmail chamado com email:", email);

  if (!email) {
    alert("Digite um email válido.");
    return;
  }

  try {
    const url = `${API_BASE}/paciente/email/${encodeURIComponent(email)}`;
    console.log("Requisição para URL:", url);

    const res = await fetch(url);
    console.log("Resposta recebida:", res);

    const data = await res.json();
    console.log("Dados recebidos do servidor:", data);

    if (!res.ok) throw new Error(data.erro || "Erro ao buscar paciente");

    const paciente = data.paciente;
    console.log("Paciente encontrado:", paciente);

    pacientesEncontrados.push(paciente);
    atualizarListaPacientes();

  } catch (err) {
    console.error("Erro ao buscar paciente:", err);
    alert("Erro ao buscar paciente: " + err.message);
  }
}

function atualizarListaPacientes() {
  const ul = document.getElementById('gc-lista-pacientes');
  if (!ul) return;

  ul.innerHTML = '';
  pacientesEncontrados.forEach((paciente) => {
    const li = document.createElement('li');
    li.textContent = `Nome: ${paciente.nome}, Telefone: ${paciente.telefone}, Condição: ${paciente.historicoMedico}`;
    ul.appendChild(li);
  });
}

// =================== Event listener para busca ===================
const btnBuscar = document.getElementById('btn-buscar-paciente');
if (btnBuscar) {
  btnBuscar.addEventListener('click', () => {
    const emailInput = document.getElementById('email-paciente');
    const email = emailInput.value.trim();
    buscarPacientePorEmail(email);
  });
}

// =================== Cuidador - Cadastro e Painel ===================
(function() {

  function handleFatal(msg) {
    console.error("ERRO FATAL:", msg);
    alert("Sessão expirada ou erro crítico: " + msg);
    window.location.href = "../views/login.html";
  }

  function salvarSessao(cuidador) {
    console.log("Salvando sessão:", cuidador);
    localStorage.setItem("cuidador", JSON.stringify(cuidador));
    localStorage.setItem("cuidadorId", cuidador.id);
    localStorage.setItem("cuidadorEmail", cuidador.email);
  }

  function obterSessao() {
    const c = localStorage.getItem("cuidador");
    return c ? JSON.parse(c) : null;
  }

  // =================== Cadastro ===================
  const form = document.getElementById('form-cuidador');
  if (form) {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const dataNascimentoInput = document.getElementById('dataNascimento');
    const especialidadeInput = document.getElementById('especialidade');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (senhaInput.value !== confirmarSenhaInput.value) {
        alert('As senhas não conferem!');
        return;
      }

      const cuidador = {
        nome: nomeInput.value.trim(),
        email: emailInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        dataNascimento: dataNascimentoInput?.value.trim() || '',
        especialidade: especialidadeInput.value.trim(),
        senha: senhaInput.value.trim()
      };

      console.log("Dados a serem enviados para cadastro:", cuidador);

      try {
        const res = await fetch(`${API_BASE}/cuidador`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cuidador)
        });

        const data = await res.json();
        console.log("Resposta do servidor após cadastro:", data);

        if (!res.ok) {
          console.error("Erro do backend:", data);
          throw new Error(data.erro || "Erro no cadastro");
        }

        const id = data.cuidadorId || data.id || null;
        if (!id) {
          console.error("ID do cuidador não retornado!");
          throw new Error("Backend não retornou ID do cuidador");
        }

        salvarSessao({ ...cuidador, id });

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../views/cuidador.html";

      } catch (err) {
        console.error("Erro ao cadastrar cuidador:", err);
        alert("Erro ao cadastrar cuidador: " + err.message);
      }
    });
  }

  // =================== Painel ===================
  document.addEventListener('DOMContentLoaded', async () => {
    const nomeSpan = document.getElementById('cuidador-nome');
    const emailSpan = document.getElementById('cuidador-email');
    const btnLogout = document.getElementById('btn-logout');

    if (btnLogout) {
      btnLogout.addEventListener('click', logout);
    }

    if (!nomeSpan && !emailSpan) return;

    const sessao = obterSessao();
    if (!sessao) return handleFatal("Sessão expirada.");

    console.log("Sessão carregada:", sessao);

    try {
      const res = await fetch(`${API_BASE}/cuidador/${sessao.id}`);
      const data = await res.json();

      console.log("Dados do cuidador recebidos:", data);

      const cuidadorAtual = (res.ok && data.cuidador) ? data.cuidador : sessao;

      atualizarHeader(cuidadorAtual);
      salvarSessao(cuidadorAtual);

    } catch (err) {
      console.error("Falha ao buscar dados do cuidador:", err);
      atualizarHeader(sessao);
    }

    function atualizarHeader(cuidador) {
      if (nomeSpan) nomeSpan.textContent = cuidador.nome || "—";
      if (emailSpan) emailSpan.textContent = cuidador.email || "—";
    }
  });

  // =================== Logout ===================
  function logout() {
    console.log("Fazendo logout");
    localStorage.removeItem("cuidador");
    localStorage.removeItem("cuidadorId");
    localStorage.removeItem("cuidadorEmail");
    window.location.href = "../views/login.html";
  }

})();
