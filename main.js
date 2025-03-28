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
  const listaMensagensErro = document.querySelectorAll('.mensagem-erro');
  const inputDataNascimento = document.querySelector('#data-nascimento');

  botaoInscrever.onclick = function () {
    let formularioValido = true;

    listaInputs.forEach((input, index) => {
      const mensagemErro = listaMensagensErro[index]; // Obtém a mensagem correspondente
      console.log(mensagemErro)

      if (input.value.trim() === "") {
        if (mensagemErro) {
          mensagemErro.style.display = "flex";
        }
        formularioValido = false;
      } else {
        if(input.type === 'email') {
          console.log("Verificando Email:", input.value);
          if(!verificarEmail(input.value)) {
            console.log("Erro de email ativado");
            if (mensagemErro) {
              // mensagemErro.style.display = "flex";
              alert("Insira um email válido");
              formularioValido = false;
            }
          }
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

  for(let contador = 0; contador < trilhas.length; contador++) {
    let escolhida = trilhas[contador];
    
    // se eu cliquei na trilha
    escolhida.onclick = function () {
      const ativa = escolhida.classList.contains("trilha-escolhida-clicada");
      
      // vai verificar se ela está clicada e atribuir a classe quando necessário
      if(!ativa) {
        for(let contador2 = 0; contador2 < trilhas.length + 1; contador2++) {
          escolhida.classList.remove("trilha-escolhida");
          escolhida.classList.add("trilha-escolhida-clicada");
          trilhaSelecionada = true;
          
          const outraTrilha = trilhas[contador2];
          
          if(outraTrilha.classList.contains("trilha-escolhida-clicada")) {
            outraTrilha.classList.remove("trilha-escolhida-clicada");
            outraTrilha.classList.add("trilha-escolhida");
          }
        }
      } else {
        escolhida.classList.remove("trilha-escolhida-clicada");
        escolhida.classList.add("trilha-escolhida");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  escolherTrilha();
  realizarInscricao();
})
