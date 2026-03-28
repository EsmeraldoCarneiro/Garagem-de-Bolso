# 🏎️ Garagem de Bolso

> **Sua coleção de miniaturas organizada, valorizada e acessível em qualquer lugar.**

A **Garagem de Bolso** é uma aplicação Full Stack desenvolvida para colecionadores de miniaturas (Hot Wheels, Matchbox, Mini GT, etc.) que desejam gerenciar seu inventário com precisão, acompanhar a valorização dos seus ativos e manter um catálogo visual moderno e responsivo.

-----

## ✨ Funcionalidades Principais

  * **🛡️ Autenticação Segura:** Sistema de login e cadastro integrado ao Firebase Authentication.
  * **📂 Gestão de Inventário (CRUD):** Adicione, edite, visualize e remova miniaturas com detalhes técnicos (Escala, Ano, Série, Cor).
  * **🔍 Busca Inteligente:** Filtre sua coleção instantaneamente por **Modelo**, **Marca** ou **Fabricante**.
  * **⭐ Filtros Rápidos:** Visualize separadamente suas peças Raras (TH, STH, Chase), itens na cartela (Blister) ou itens fora da caixa (Loose).
  * **💰 Gestão de Ativos:** Controle o preço pago e o valor atual de cada item (integrado à página de Finanças).
  * **📸 Galeria Visual:** Visualização em cards com suporte a fotos e modal de zoom.
  * **📱 Design Responsivo:** Interface otimizada para Desktop e Mobile, com centralização perfeita e usabilidade intuitiva.
  * **✨ Splash Screen:** Tela de abertura personalizada com transição suave.

-----

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas do ecossistema React:

  * **Vite:** Build tool ultra-rápida para o desenvolvimento.
  * **React JS:** Biblioteca principal para construção da interface.
  * **Firebase:**
      * *Firestore:* Banco de dados NoSQL em tempo real.
      * *Auth:* Gerenciamento de usuários.
  * **React Router Dom:** Navegação entre páginas (Abertura, Login, Dashboard, Finanças).
  * **CSS3 Custom Properties:** Estilização com degradês modernos e animações.

-----

## 🛠️ Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/garagem-de-bolso.git
    ```

2.  **Entre na pasta do projeto:**

    ```bash
    cd garagem-de-bolso
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure o Firebase:**
    Crie um arquivo em `src/config/firebase.js` e adicione suas credenciais:

    ```javascript
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_AUTH_DOMAIN",
      projectId: "SEU_PROJECT_ID",
      storageBucket: "SEU_STORAGE_BUCKET",
      messagingSenderId: "SEU_SENDER_ID",
      appId: "SEU_APP_ID",
      measurementId: "SEU_MEASUREMENT_ID
    };
    ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

-----

## 📂 Estrutura de Pastas

```text
src/
 ├── assets/          # Imagens, ícones e logo (logo.png)
 ├── components/      # Componentes reutilizáveis (botões, cards, inputs)
 ├── config/          # Configuração do Firebase (firebase.js)
 ├── context/         # Gerenciamento de Estados Globais (Context API)
 ├── hooks/           # Hooks personalizados (useAuth, useLocalStorage)
 ├── pages/           # Telas principais da aplicação
 │    ├── Abertura/   # Splash Screen inicial
 │    ├── Dashboard/  # Painel principal da Garagem
 │    ├── Financas/   # Gestão financeira de ativos
 │    ├── Home/       # Landing page / Tela de boas-vindas
 │    └── Login/      # Autenticação de usuários
 ├── routes/          # Configuração de navegação e Rota Privada
 ├── services/        # Conexão com APIs externas ou funções do Firebase
 ├── styles/          # Estilos globais e variáveis de cores (CSS)
 ├── App.jsx          # Componente principal e roteamento
 └── main.jsx         # Ponto de entrada do React/Vite
```

-----

## 🎨 Identidade Visual

O projeto utiliza uma paleta de cores inspirada na cultura automotiva clássica:

  * **Fundo:** `#121212` (Dark Mode profundo)
  * **Destaques:** Degradê de `#ff4757` (Vermelho) para `#ff9f43` (Laranja) e `#feca57` (Amarelo).
  * **Tipografia:** Foco em legibilidade e títulos robustos para transmitir força.

-----

## 🤝 Contribuição

Contribuições são sempre bem-vindas\!

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua feature (`git checkout -b feature/NovaFeature`).
3.  Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4.  Push para a Branch (`git push origin feature/NovaFeature`).
5.  Abra um Pull Request.

-----

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

Desenvolvido por Esmeraldo Carneiro.
