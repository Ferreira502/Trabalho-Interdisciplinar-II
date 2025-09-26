const pacienteBotao = document.getElementById("paciente");
const medicoBotao = document.getElementById("medico");
const senhaInput = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrar-senha");
const formulario = document.getElementById("form-login");

pacienteBotao.addEventListener("click", () => {
  pacienteBotao.classList.add("ativo");
  medicoBotao.classList.remove("ativo");
});

medicoBotao.addEventListener("click", () => {
  medicoBotao.classList.add("ativo");
  pacienteBotao.classList.remove("ativo");
});

mostrarSenha.addEventListener("click", () => {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
  } else {
    senhaInput.type = "password";
  }
});

// Envio do formulário
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login realizado com sucesso!");
});