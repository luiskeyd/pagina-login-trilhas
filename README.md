## 🚀 FORMULÁRIO PROGRAMA TRILHAS INOVA

**Sobre o Projeto:**

O Programa Trilhas Inova, uma iniciativa da Secretaria de Ciência, Tecnologia e Inovação do Governo do Maranhão, está em sua segunda edição em 2025. Com o objetivo de formar jovens talentos para o mercado de tecnologia, o programa expande significativamente nesta edição, oferecendo um número de vagas **5 vezes maior**.

Este projeto visa desenvolver uma página intuitiva de cadastro e login para coletar as informações essenciais dos candidatos. A clareza e a concisão do formulário são prioridades, buscando facilitar o processo de inscrição tanto para os futuros participantes quanto para a equipe de avaliação.

---

**💻 Como Rodar Localmente:**

Para testar o programa em seu ambiente local, siga estas etapas:

1.  **Baixe o repositório:** Faça o download do arquivo `.zip`.
2.  **Abra com sua IDE:** Utilize o VS Code ou outra IDE de sua preferência para acessar os arquivos.
3.  **Execute o `index.html`:** Clique com o botão direito no arquivo `index.html` e selecione a opção para abrir no navegador.
4.  **Preencha o formulário:** Navegue pelas etapas do cadastro e preencha os dados solicitados.
5.  **Teste o Login:** Ao finalizar o cadastro, você será direcionado para a página de login, onde poderá verificar as funcionalidades implementadas.

![Imagem da Pagina Principal](assets/telaPrincipal.png)

---

**🛠️ Tecnologias Utilizadas:**

As seguintes tecnologias foram empregadas no desenvolvimento deste projeto:

* **Tecnologias Principais:**
    * **HTML (Hiper Text Markup Language):** Para a estruturação e marcação de todo o conteúdo da página.
    * **CSS (Cascading Style Sheets):** Responsável pela estilização visual e layout de todos os elementos da plataforma.
    * **JAVASCRIPT:** Para adicionar interatividade, dinamismo e implementar as funcionalidades do formulário e login.
* **Tecnologias Adicionais:**
    * **API ViaCEP:** Integrada para validar e preencher automaticamente os dados de endereço a partir do CEP fornecido.
    * **Toastify JS:** Utilizada para exibir notificações e alertas personalizados de forma elegante e não intrusiva.

---

**✨ Principais Funcionalidades:**

O sistema oferece as seguintes funcionalidades essenciais:

* **Validação de Campos Obrigatórios:** Garante que todos os campos marcados como obrigatórios sejam preenchidos antes da submissão.
* **Verificação de Campos Incorretos:** Implementa validações para formatos específicos como e-mail, CEP, telefone e CPF, alertando o usuário sobre dados inválidos.
* **Verificação de Arquivos:** Assegura que o usuário realize o upload de arquivos quando necessário.
* **Seleção de Trilha:** Impede o avanço do cadastro caso nenhuma trilha de interesse seja selecionada.
* **Aceite dos Termos:** Requer que o usuário concorde com os termos e condições para prosseguir com a inscrição.
* **Redirecionamento para Login:** Após o cadastro bem-sucedido, o usuário é automaticamente direcionado para a página de login.
* **Funcionalidade de Login:** Permite que usuários previamente cadastrados acessem a plataforma.
* **Salvamento Temporário de Dados:** Os dados principais do formulário são armazenados temporariamente no `sessionStorage`. Esses dados são apagados ao recarregar a página ou após o login ser realizado.

---
