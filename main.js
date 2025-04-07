let trilhaSelecionada = false;
let cepCorreto = true;

// função pra mostrar os alerts personalizados
function mostrarToast(mensagem, tipo = "info") {
  let cor;

  switch (tipo) {
    case "sucesso":
      cor = "#008000";
      break;
    case "erro":
      cor = "#dc2626";
      break;
    case "aviso":
      cor = "#e0a800";
      break;  
    default:
      cor = "#333";
  }

  Toastify({
    text: mensagem,
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    close: true,
    style: {
      background: cor,
    },
  }).showToast();
}


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

function verificarNomeCompleto(nome) {
  // vai verificar se tem pelo menos duas palavras inseridas
  const partes = nome.trim().split(' ');
  return partes.length >= 2 && partes.every(parte => parte.length >= 2);
}

function verificarTelefone(telefone) {
  const regex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;
  return regex.test(telefone);
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

// vai retirar todas as letras do CPF, se sobrarem 11 números é pq não havia nenhuma letra
function verificarCPF(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, '');
  return /^\d{11}$/.test(cpfLimpo);
}

// a função verifica se o CEP está correto, se sim ela autopreenche os campos de cidade e estado, se não ela emite o alert
function verificarEndereco() {
  document.getElementById("cep")?.addEventListener("blur", function () {
    let cep = this.value.replace(/\D/g, "");
  
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            const mensagemErroCep = document.getElementById("cep")?.closest('.participant')?.querySelector('.mensagem-erro');
            if (mensagemErroCep) mensagemErroCep.style.display = "none";
            if (data.uf !== "MA") {
              mostrarToast('Somente candidatos Maranhenses ou que residem no estado são permitidos', 'erro');
              return;
            }
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
            cepCorreto = true;
          } else {
            mostrarToast("CEP não encontrado.", 'erro');
            cepCorreto = false;
          }
        })
        .catch(() => alert("Erro ao buscar CEP."));
    } else {
      mostrarToast("CEP inválido.", 'erro');
      cepCorreto = false;
    }
  });
}

function escolherTrilha() {
  const trilhas = document.querySelectorAll('.trilha-escolhida');

  trilhas.forEach((escolhida) => {
    escolhida.addEventListener('click', function () {
      const ativa = escolhida.classList.contains("trilha-escolhida-clicada");

      // remove a seleção de todas as trilhas antes de ativar uma nova
      trilhas.forEach(trilha => {
        trilha.classList.remove("trilha-escolhida-clicada");
        trilha.classList.add("trilha-escolhida");
      });

      // se a trilha clicada não tava ativa, ativa ela
      if (!ativa) {
        escolhida.classList.remove("trilha-escolhida");
        escolhida.classList.add("trilha-escolhida-clicada");
        trilhaSelecionada = true;
      } else {
        trilhaSelecionada = false; // nenhuma trilha tá marcada
      }
    });
  });
}

function realizarInscricao() {
  const botaoInscrever = document.getElementById('inscrever');
  const listaInputs = document.querySelectorAll('.name-input');
  const inputDataNascimento = document.querySelector('#data-nascimento');
  const inputArquivo = document.querySelectorAll('input[type=file]');
  const inputId = document.getElementById('usuario');
  const inputSenha = document.getElementById('senha');

  escolherTrilha();
  verificarEndereco();

  botaoInscrever?.addEventListener("click", function () {
    let formularioValido = true;
    let arquivoFaltando = false;

    listaInputs.forEach((input, index) => {
      const mensagemErro = input.closest('.participant')?.querySelector('.mensagem-erro');
      const valor = input.value.trim();
      let inputValido = true;
    
      // verificar campo vazio
      if (valor === "") {
        inputValido = false;
        if (mensagemErro) mensagemErro.style.display = "flex";
      } else {
        if (mensagemErro) mensagemErro.style.display = "none";
    
        // verificação do email
        if (input.type === 'email' && !verificarEmail(valor)) {
          mostrarToast("Insira um email válido", "aviso");
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }
    
        // verificação do nome completo (índice 0)
        if (index === 0 && !verificarNomeCompleto(valor)) {
          mostrarToast("Por favor, insira o nome completo (nome e sobrenome).", "aviso");
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }
    
        // verificação do telefone (índice 4)
        if (index === 4 && !verificarTelefone(valor)) {
          mostrarToast("Telefone inválido! Use o formato (99) 99999-9999.", "aviso");
          inputValido = false;
        }

        // verificacão do CPF (índice 2)
        if (index === 2 && !verificarCPF(valor)) {
          mostrarToast("CPF inválido! Insira apenas números.", "aviso");
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }

        if (index === 7 && cepCorreto == false) {
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }
      }
    
      // aplica ou remove classe de erro
      if (!inputValido) {
        input.classList.add('name-input-errado');
        formularioValido = false;
      } else {
        input.classList.remove('name-input-errado');
      }
    });

    if(inputDataNascimento) {
      const idade = calcularIdade(inputDataNascimento.value);
      if(idade < 16 || idade > 24) {
        mostrarToast("Somente pessoas com idade entre 16 e 24 anos podem se inscrever no Programa Trilhas!", "erro");
        formularioValido = false;
      }
    }

    // pra verificar se o candidato enviou os arquivos
    inputArquivo.forEach((input) => {
      if(input.files.length === 0) {
        arquivoFaltando = true;
        formularioValido = false;
      }
    })

    // essa linha de código só existe para o alert aparecer apenas uma vez no caso do usuário não ter adicionado nenhum dos dois arquivos
    if(arquivoFaltando) {
      mostrarToast('Documento de Identidade e/ou Comprovante de Residência faltando', "erro");
      formularioValido = false;
    }
    
    if (!verificarTermos()) {
      mostrarToast("Você precisa aceitar os Termos e Políticas de Privacidade para prosseguir!", "aviso");
      formularioValido = false;
    }

    if(trilhaSelecionada == false) {
      mostrarToast("Você precisa selecionar uma trilha para prosseguir!", "aviso");
      formularioValido = false;
    }

    console.log(formularioValido);

    if (formularioValido) {
      const dadosFormulario = {
        nome: listaInputs[0]?.value || "",
        email: listaInputs[3]?.value || "",
        dataNascimento: inputDataNascimento.value,
        trilha: document.querySelector('.trilha-escolhida-clicada')?.textContent || "",
        idUsuario: inputId.value,
        senhaUsuario: inputSenha.value,
        userCPF: listaInputs[2].value,
        userEndereco: listaInputs[7].value,
      }

      sessionStorage.setItem('dadosInscricao', JSON.stringify(dadosFormulario));
      
      mostrarToast("Inscrição realizada com sucesso!", "sucesso");
      
      // o alert de inscrição bem sucedida não conseguia aparecer pq ia instantaneamente pra outra página, tive que atrasar o processo
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }
  })
}

function realizarLogin() {
  const loginBtn = document.getElementById('login-btn');

  loginBtn?.addEventListener("click", function () {
    const idInserido = document.getElementById('loginId').value;
    const senhaInserida = document.getElementById('loginSenha').value;
    
    const dadosSalvos = JSON.parse(sessionStorage.getItem("dadosInscricao"));

    if (!dadosSalvos) {
      mostrarToast('Nenhum usuário cadastrado ou sessão expirou', "erro");
      return;
    }

    if (idInserido === dadosSalvos.idUsuario && senhaInserida === dadosSalvos.senhaUsuario) {
      mostrarToast('Login realizado com sucesso!', "sucesso");
      sessionStorage.clear();
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    } else {
      mostrarToast('ID ou senha incorretos', "erro");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // basicamente remove os dados do sessionStorage se o usuário recarregar a página
  const navEntries = performance.getEntriesByType("navigation");

  if (navEntries.length > 0 && navEntries[0].type === "reload") {
    sessionStorage.clear();
  }

  realizarInscricao();
  realizarLogin();
})
