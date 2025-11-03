# Semana das Engenharias 2025 - Landing Page Dinâmica

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Este repositório contém o código-fonte da landing page oficial do evento "Semana das Engenharias 2025", realizado pela Universidade Federal do Ceará (UFC) - Campus Crateús.

O tema para o evento de 2025 é: **"Transição Sustentável: O Papel das Engenharias no Futuro das Organizações, Sociedade e Meio Ambiente"**.

![Uma captura de tela da seção principal do site](https://github.com/VicenteNeto21/secrateus-2025/blob/main/assets/img/tela.PNG?raw=true)

## ✨ Funcionalidades

*   **Design Totalmente Responsivo**: Visualização otimizada para desktops, tablets e dispositivos móveis.
*   **Conteúdo Dinâmico com JSON**: Facilidade para atualizar seções como Programação, Competições e Notícias sem tocar no HTML.
*   **Fundo Interativo**: Efeito de partículas na seção principal para uma atmosfera tecnológica.
*   **Contador Regressivo**: Mostra dinamicamente os dias restantes para o evento.
*   **Programação Interativa**: Usuários podem alternar facilmente entre os dias do evento para ver a programação.
*   **Carrossel de Notícias**: Navegação por toque ou botões para visualizar os últimos anúncios.
*   **Rolagem Suave**: Navegação limpa entre as seções.
*   **Barra de Navegação Dinâmica**: A barra de navegação muda de aparência durante a rolagem para uma melhor experiência do usuário.
*   **UI/UX Moderno**: Construído com Tailwind CSS para um visual limpo e moderno, com efeitos de hover e animações sutis.

## 🛠️ Tecnologias Utilizadas

*   **HTML5**: Para a estrutura básica do site.
*   **Tailwind CSS**: Um framework CSS utility-first para desenvolvimento rápido de UI (via CDN).
*   **JavaScript (Vanilla)**: Para elementos interativos como o contador, efeitos da barra de navegação e abas da programação.
*   **Google Fonts**: Para a fonte 'Inter'.
*   **Font Awesome**: Para os ícones (via CDN).
*   **Particles.js**: Para o fundo animado da seção principal.

## 🚀 Como Começar

Como este é um site estático sem processo de build, você pode executá-lo localmente com muita facilidade.

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/your-username/secrateus-2025.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```sh
    cd secrateus-2025
    ```

3.  **Abra o arquivo `index.html`:**
    Simplesmente abra o arquivo `index.html` no seu navegador de preferência (ex: Chrome, Firefox, Edge).

    Você pode fazer isso clicando duas vezes no arquivo no seu explorador de arquivos ou clicando com o botão direito e selecionando "Abrir com...".

## 🔧 Customização

A maior parte do conteúdo do site é carregada dinamicamente a partir de arquivos `.json` localizados na pasta `assets/js/`. Isso torna a atualização do site muito mais simples.

*   **Data do Evento e Contador**:
    *   Para alterar a data do evento, abra o arquivo `assets/js/script.js` e procure pela função `updateCountdown`.
    *   Modifique a string da data na linha: `const eventDate = new Date('2025-11-26T00:00:00');`

*   **Programação, Competições, Novidades, etc.**:
    *   **Programação**: Edite o arquivo `assets/js/program.json`.
    *   **Competições**: Edite o arquivo `assets/js/competitions.json`.
    *   **Edições Anteriores**: Edite o arquivo `assets/js/previous-editions.json`.
    *   **Novidades**: Edite o arquivo `assets/js/news.json`.
    *   **Detalhes do "Sobre"**: Edite o arquivo `assets/js/about.json`.
    *   **Patrocinadores**: Edite o arquivo `assets/js/sponsors.json` e adicione os logos na pasta `assets/img/sponsors/`.

*   **Link de Inscrição**:
    *   No arquivo `index.html`, encontre a `<section id="registration">`.
    *   Atualize o atributo `href` do botão principal de inscrição: `<a href="#" ...>`.

*   **Cores e Fontes**:
    *   As cores primárias são definidas como variáveis CSS no arquivo `assets/css/style.css`. Você pode alterá-las lá para re-tematizar o site rapidamente.
    ```css
    :root {
        --primary-blue: #1e40af;
        --primary-green: #059669;
    }
    ```

## 📄 Licença

Este projeto é de código aberto e está disponível sob a Licença MIT.
