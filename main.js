let trilhaSelecionada = false;

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  // caso o aniversário ainda não tenha acontecido esse ano
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

function verificarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

function verificarTermos() {
  const checkBoxTermos = document.querySelector(".check-termos");
  const termoAceito = checkBoxTermos.checked;
  console.log(termoAceito)

  if(!termoAceito) {
    return false;
  }
  
  return true;
}

function realizarInscricao() {
  const botaoInscrever = document.getElementById('inscrever');
  const listaInputs = document.querySelectorAll('.name-input');
  const inputDataNascimento = document.querySelector('#data-nascimento');

  escolherTrilha();

  botaoInscrever.onclick = function () {
    let formularioValido = true;

    listaInputs.forEach((input) => {
      const mensagemErro = input.closest('.participant')?.querySelector('.mensagem-erro'); // Obtém a mensagem correspondente
      console.log(mensagemErro)

      if (input.value.trim() === "") {
        if (mensagemErro) {
          mensagemErro.style.display = "flex";
        }
        formularioValido = false;
      } else {
        if(input.type === 'email' && !verificarEmail(input.value)) {
          console.log("Verificando Email:", input.value);
          console.log("Erro de email ativado");
          // mensagemErro.style.display = "flex";
          alert("Insira um email válido");
          formularioValido = false;
        }
        
        if (mensagemErro) {
          mensagemErro.style.display = "none";
        }
      }
    });

    if(inputDataNascimento) {
      const idade = calcularIdade(inputDataNascimento.value);
      if(idade < 16 || idade > 24) {
        alert("Somente pessoas com idade entre 16 e 24 anos podem se inscrever no Programa Trilhas!");
        formularioValido = false;
      }
    }
    
    if (!verificarTermos()) {
      alert("Você precisa aceitar os Termos e Políticas de Privacidade para prosseguir!");
      formularioValido = false;
    }

    if(trilhaSelecionada == false) {
      alert("Você precisa selecionar uma trilha para prosseguir!");
      formularioValido = false;
    }

    console.log(formularioValido);

    if (formularioValido) {
      alert("Inscrição realizada com sucesso!");
      window.location.href = "login.html";
    }
  }
}

function escolherTrilha() {
  const trilhas = document.querySelectorAll('.trilha-escolhida');

  trilhas.forEach((escolhida) => {
    escolhida.addEventListener('click', function () {
      const ativa = escolhida.classList.contains("trilha-escolhida-clicada");

      // Remove a seleção de todas as trilhas antes de ativar uma nova
      trilhas.forEach(trilha => {
        trilha.classList.remove("trilha-escolhida-clicada");
        trilha.classList.add("trilha-escolhida");
      });

      // Se a trilha clicada não estava ativa, ativa ela
      if (!ativa) {
        escolhida.classList.remove("trilha-escolhida");
        escolhida.classList.add("trilha-escolhida-clicada");
        trilhaSelecionada = true;
      } else {
        trilhaSelecionada = false; // Nenhuma trilha está marcada
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  realizarInscricao();
})
