let perfilSelecionado = null;
    
    function selecionarPerfil(perfil) {
      // Remover a classe ativa de todos os perfis
      document.querySelectorAll('.perfil').forEach(p => {
        p.classList.remove('ativo');
      });
      
      // Adicionar a classe ativa ao perfil selecionado
      document.getElementById(perfil).classList.add('ativo');
      
      // Atualizar o perfil selecionado
      perfilSelecionado = perfil;
      
      // Habilitar o botão de continuar
      document.getElementById('botao-continuar').disabled = false;
    }
    
    function continuarParaCadastro() {
      if (perfilSelecionado === 'paciente') {
        window.location.href = 'cadastro_paciente.html';
      } else if (perfilSelecionado === 'medico') {
        window.location.href = 'cadastro_cuidador.html';
      }
    }