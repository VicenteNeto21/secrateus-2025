# Semana das Engenharias 2025 - Landing Page Dinâmica

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Este repositório contém o código-fonte da landing page oficial do evento "Semana das Engenharias 2025", realizado pela Universidade Federal do Ceará (UFC) - Campus Crateús.

O tema para o evento de 2025 é: **"Transição Sustentável: O Papel das Engenharias no Futuro das Organizações, Sociedade e Meio Ambiente"**.

![Captura de tela da página inicial do evento](https://github.com/VicenteNeto21/secrateus-2025/blob/main/assets/img/tela.PNG?raw=true)

## ✨ Funcionalidades

*   **Design Totalmente Responsivo**: Visualização otimizada para desktops, tablets e dispositivos móveis.
*   **Conteúdo Dinâmico com JSON**: Facilidade para atualizar seções como Programação, Competições e Notícias sem tocar no HTML.
*   **Fundo Interativo**: Efeito de partículas na seção principal para uma atmosfera tecnológica.
*   **Contador Regressivo**: Mostra dinamicamente os dias restantes para o evento.
*   **Programação Interativa**: Usuários podem alternar facilmente entre os dias do evento, com uma legenda de cores gerada dinamicamente.
*   **Rolagem Suave**: Navegação limpa entre as seções.
*   **Barra de Navegação Dinâmica**: A barra de navegação muda de aparência durante a rolagem para uma melhor experiência do usuário.

## 🛠️ Tecnologias Utilizadas

*   **HTML5**: Para a estrutura básica do site.
*   **Tailwind CSS**: Um framework CSS utility-first para desenvolvimento rápido de UI (via CDN).
*   **JavaScript (Vanilla)**: Para elementos interativos como o contador, efeitos da barra de navegação e abas da programação.
*   **Google Fonts**: Para a fonte 'Inter'.
*   **Font Awesome**: Para os ícones (via CDN).
*   **Particles.js**: Para o fundo animado da seção principal.

## 📂 Estrutura do Projeto

O projeto é organizado de forma a separar a estrutura (HTML), a lógica (JS) e os dados (JSON), facilitando a manutenção.

```
secrateus-2025/
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos personalizados e variáveis de cor
│   ├── img/                  # Imagens, logos e favicons
│   └── js/
│       ├── script.js         # Lógica principal da aplicação (carregamento de dados, interações)
│       ├── particles-config.js # Configuração do fundo animado
│       └── *.json            # Arquivos de dados (programação, competições, etc.)
├── index.html                # Arquivo principal da página
└── README.md                 # Este arquivo
```

##  Como Começar

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

A maior parte do conteúdo do site é carregada dinamicamente a partir de arquivos `.json` localizados na pasta `assets/js/`. Isso torna a atualização do site muito mais simples e segura, pois não é necessário editar o HTML.

#### Dados do Evento (JSON)

*   **Programação**: Edite `assets/js/program.json` para adicionar ou modificar palestras, minicursos e outros eventos. A legenda de cores é gerada automaticamente a partir dos tipos e cores definidos aqui.
*   **Competições**: Edite `assets/js/competitions.json` para detalhar as competições, incluindo prêmios, requisitos e links para editais.
*   **Palestrantes**: Edite `assets/js/speakers.json` para exibir os perfis dos palestrantes.
*   **Edições Anteriores**: Edite `assets/js/previous-editions.json` para manter o histórico do evento.
*   **Patrocinadores**: Adicione novos patrocinadores em `assets/js/sponsors.json` e inclua seus logos na pasta `assets/img/sponsors/`.
*   **Cards "Sobre"**: Modifique os cards da seção "Sobre" em `assets/js/about.json`.

#### Configurações Gerais

*   **Data do Evento (Contador)**: Para alterar a data final do contador regressivo, edite a função `updateCountdown` no arquivo `assets/js/script.js`:
    ```javascript
    const eventDate = new Date('2025-11-26T00:00:00');
    ```

*   **Links de Inscrição**: Os links principais de inscrição podem ser atualizados diretamente no `index.html`, na seção `<section id="registration">`.

*   **Cores e Estilos**: As cores principais e outros estilos globais podem ser ajustados no arquivo `assets/css/style.css`.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a Licença MIT.
