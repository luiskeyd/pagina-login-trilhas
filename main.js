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

function verificarEndereco() {
  document.getElementById("cep")?.addEventListener("blur", function () {
    let cep = this.value.replace(/\D/g, "");
  
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            if (data.uf !== "MA") {
              alert('Somente candidatos Maranhenses ou que residem no estado são permitidos');
              return;
            }
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
          } else {
            alert("CEP não encontrado.");
          }
        })
        .catch(() => alert("Erro ao buscar CEP."));
    } else {
      alert("CEP inválido.");
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
          alert("Insira um email válido");
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }
    
        // verificação do nome completo (índice 0)
        if (index === 0 && !verificarNomeCompleto(valor)) {
          alert("Por favor, insira o nome completo (nome e sobrenome).");
          if (mensagemErro) mensagemErro.style.display = "flex";
          inputValido = false;
        }
    
        // verificação do telefone (índice 4)
        if (index === 4 && !verificarTelefone(valor)) {
          alert("Telefone inválido! Use o formato (99) 99999-9999.");
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
        alert("Somente pessoas com idade entre 16 e 24 anos podem se inscrever no Programa Trilhas!");
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
      alert('Documento de Identidade e/ou Comprovante de Residência faltando');
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
      
      alert("Inscrição realizada com sucesso!");
      window.location.href = "login.html";
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
      alert('Nenuhm usuário cadastrado ou sessão expirou');
      return;
    }

    if (idInserido === dadosSalvos.idUsuario && senhaInserida === dadosSalvos.senhaUsuario) {
      alert('Login realizado com sucesso!');
      sessionStorage.clear();
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    } else {
      alert('ID ou senha incorretos');
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  realizarInscricao();
  realizarLogin();
})
