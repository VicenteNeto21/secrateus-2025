// ============================================
// SECRATEUS 2025 - Main JavaScript
// ============================================

// ============================================
// 1. CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
    eventDate: new Date('2025-11-26T08:00:00'),
    imagesPerLoad: 8
};

// ============================================
// 2. ESTADO DA APLICAÇÃO
// ============================================

const AppState = {
    gallery: {
        allImages: [],
        filteredImages: [],
        currentPage: 1
    }
};

// ============================================
// 3. NAVEGAÇÃO
// ============================================

/**
 * Efeito de scroll no navbar
 */
function initNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('nav-scrolled', 'py-3');
            navbar.classList.add('py-4');
        }
    });
}

/**
 * ScrollSpy para marcar a seção ativa
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link-desktop, .nav-link-mobile');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinksAll.forEach(link => {
                    link.classList.remove('nav-link-active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('nav-link-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Smooth scroll para links de navegação
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// 4. MENU MOBILE
// ============================================

/**
 * Toggle do menu mobile
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuContainer = document.getElementById('mobile-menu-container');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = menuBtn.querySelector('i');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    function toggleMenu() {
        const isOpen = menuContainer.classList.contains('active');

        if (isOpen) {
            menuContainer.classList.remove('active');
            menuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
            menuIcon.classList.replace('fa-times', 'fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Abrir menu');
        } else {
            menuContainer.classList.add('active');
            menuOverlay.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.classList.add('overflow-hidden');
            menuIcon.classList.replace('fa-bars', 'fa-times');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Fechar menu');
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// ============================================
// 5. COUNTDOWN
// ============================================

/**
 * Atualiza o contador regressivo
 */
function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.eventDate - now;

    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    if (diff <= 0) {
        countdownElement.innerHTML = `
            <div class="text-xs sm:text-sm">O EVENTO</div>
            <div class="text-xl sm:text-2xl">COMEÇOU!</div>
        `;
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    countdownElement.innerHTML = `
        <div class="text-xs sm:text-sm">FALTAM</div>
        <div class="text-xl sm:text-2xl">${days} dias</div>
    `;
}

function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // Atualiza a cada hora
}

// ============================================
// 6. PROGRAMAÇÃO
// ============================================

/**
 * Alternar entre dias da programação
 */
function initProgramDays() {
    document.querySelectorAll('.program-day').forEach(button => {
        button.addEventListener('click', function () {
            // Remove active de todos os botões
            document.querySelectorAll('.program-day').forEach(btn => {
                btn.setAttribute('aria-pressed', 'false');
                btn.classList.remove('active');
            });

            // Add active ao botão clicado
            this.setAttribute('aria-pressed', 'true');
            this.classList.add('active');

            // Esconde todos os conteúdos
            document.querySelectorAll('.program-content').forEach(content => {
                content.classList.add('hidden');
            });

            // Mostra o conteúdo selecionado
            const day = this.getAttribute('data-day');
            document.getElementById(day).classList.remove('hidden');
        });
    });
}

/**
 * Renderiza a programação
 */
function renderProgram(programData) {
    const containers = {
        1: document.getElementById('day1'),
        2: document.getElementById('day2')
    };

    if (!containers[1] || !containers[2]) return;

    Object.values(containers).forEach(c => c.innerHTML = '');

    // Legenda dinâmica
    renderProgramLegend(programData);

    // Renderiza eventos
    programData.forEach(event => {
        const registrationHTML = event.registration ?
            `<div class="mt-4">
                <span class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium"><i class="fas fa-trophy mr-2"></i>Prêmio: ${event.prize}</span>
            </div>` :
            `<div class="mt-4">
                <span class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium">Entrada Livre</span>
            </div>`;

        const eventHTML = `
            <article class="bg-white rounded-2xl shadow-lg card-hover overflow-hidden">
                <div class="flex flex-col md:flex-row">
                    <div class="md:w-1/3 bg-${event.color}-500 text-white p-6 flex flex-col justify-center">
                        <div class="text-xl md:text-2xl font-bold">${event.startTime}</div>
                        <div class="text-base md:text-lg">às ${event.endTime}</div>
                        <div class="mt-2 text-sm font-medium bg-${event.color}-600 inline-block px-3 py-1 rounded-full">${event.type}</div>
                    </div>
                    <div class="md:w-2/3 p-6">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-3">${event.title}</h3>
                        ${event.description && event.description !== 'sem descrição' ?
                `<p class="text-gray-600 mb-4">${event.description}</p>` : ''
            }
                        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-4">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-user text-${event.color}-500"></i>
                                <span class="text-gray-700">${event.speaker}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-map-marker-alt text-${event.color}-500"></i>
                                <span class="text-gray-700">${event.location}</span>
                            </div>
                        </div>
                        ${registrationHTML}
                    </div>
                </div>
            </article>
        `;

        const container = containers[event.day];
        if (container) container.innerHTML += eventHTML;
    });

    // Re-inicializa o dia ativo
    const activeDay = document.querySelector('.program-day.active');
    if (activeDay) activeDay.click();
}

/**
 * Renderiza a legenda da programação
 */
function renderProgramLegend(programData) {
    const legendContainer = document.getElementById('program-legend');
    if (!legendContainer) return;

    // Extrai tipos e cores únicos
    const eventTypes = programData.reduce((acc, event) => {
        if (!acc.some(item => item.type === event.type)) {
            acc.push({ type: event.type, color: event.color });
        }
        return acc;
    }, []);

    let legendHTML = '';
    eventTypes.forEach(item => {
        legendHTML += `
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-${item.color}-500 rounded-full"></div>
                <span class="text-sm text-gray-600">${item.type}</span>
            </div>`;
    });
    legendContainer.innerHTML = legendHTML;
}

// ============================================
// 7. COMPETIÇÕES
// ============================================

/**
 * Renderiza as competições
 */
function renderCompetitions(competitionsData) {
    const container = document.getElementById('competitions-container');
    if (!container) return;
    container.innerHTML = '';

    competitionsData.forEach(comp => {
        const requirementsHTML = comp.requirements.map(req => `<li>${req}</li>`).join('');

        const competitionHTML = `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group flex flex-col border-t-4 border-${comp.color}-500">
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-3">${comp.title}</h3>
                    <p class="text-gray-600 mb-5">${comp.description}</p>

                    <!-- Requirements -->
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-800 mb-2">Requisitos:</h4>
                        <ul class="text-sm text-gray-600 list-disc pl-5 space-y-1">${requirementsHTML}</ul>
                    </div>
                    
                    <!-- Prize and Date -->
                    <div class="grid grid-cols-2 gap-4 mb-6 text-center">
                        <div class="bg-${comp.color}-50 border border-${comp.color}-200 rounded-lg p-3 flex flex-col justify-center">
                            <div class="text-xs text-${comp.color}-700 font-bold uppercase">PRÊMIO</div>
                            <div class="text-lg font-extrabold text-${comp.color}-800">${comp.prize}</div>
                        </div>
                        <div class="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col justify-center">
                            <div class="text-xs text-red-700 font-bold uppercase">ENCERRAMENTO</div>
                            <div class="text-lg font-extrabold text-red-800">23/11</div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="mt-auto pt-5 border-t border-gray-200">
                        <button disabled class="w-full bg-gray-300 text-gray-500 text-center px-4 py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 cursor-not-allowed opacity-60">
                            <i class="fas fa-lock"></i> Inscrições Encerradas
                        </button>
                        <a href="${comp.editalLink}" target="_blank" rel="noopener" class="w-full block text-center text-gray-600 mt-3 font-semibold hover:text-${comp.color}-600 transition duration-200 text-sm">
                            Ler o edital completo
                        </a>
                    </div>
                </div>
            </div>`;
        container.innerHTML += competitionHTML;
    });
}

// ============================================
// 8. EDIÇÕES ANTERIORES
// ============================================

/**
 * Renderiza as edições anteriores
 */
function renderPreviousEditions(editionsData) {
    const container = document.getElementById('previous-editions-container');
    if (!container) return;
    container.innerHTML = '';

    editionsData.forEach(edition => {
        const editionHTML = `
            <a href="${edition.link}" target="_blank" rel="noopener" class="block bg-white rounded-2xl shadow-lg overflow-hidden card-hover group border-t-4 border-${edition.color}-500 h-full">
                <div class="p-6 flex flex-col h-full">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <span class="bg-${edition.color}-100 text-${edition.color}-800 px-3 py-1 rounded-full text-sm font-bold">${edition.year}</span>
                            <i class="fas fa-external-link-alt text-gray-400 group-hover:text-${edition.color}-500 transition-colors duration-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${edition.title}</h3>
                        <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <i class="fas fa-calendar"></i>
                            <span>${edition.date}</span>
                        </div>
                    </div>
                </div>
            </a>`;
        container.innerHTML += editionHTML;
    });
}

// ============================================
// 9. PALESTRANTES
// ============================================

/**
 * Renderiza os palestrantes
 */
function renderSpeakers(speakersData) {
    const container = document.getElementById('speakers-container');
    if (!container) return;
    let allSpeakersHTML = '';

    speakersData.forEach(speaker => {
        const speakerHTML = `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden text-center group card-hover border-b-4 border-${speaker.color}-500">
                <div class="relative">
                    <img src="${speaker.image}" alt="Foto de ${speaker.name}" class="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-300">
                    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 class="text-xl font-bold text-white">${speaker.name}</h3>
                        <p class="text-yellow-300 font-medium">${speaker.title}</p>
                    </div>
                </div>
                <div class="p-6">
                    <p class="text-gray-700 font-semibold mb-4">Palestra: <span class="text-${speaker.color}-600">"${speaker.topic}"</span></p>
                    <a href="${speaker.linkedin}" target="_blank" rel="noopener" class="inline-block bg-${speaker.color}-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-${speaker.color}-700 transition-colors duration-200">
                        <i class="fab fa-linkedin mr-2"></i> Ver Perfil
                    </a>
                </div>
            </div>`;
        allSpeakersHTML += speakerHTML;
    });
    container.innerHTML = allSpeakersHTML;
}

// ============================================
// 10. PATROCINADORES
// ============================================

/**
 * Renderiza os patrocinadores
 */
function renderSponsors(sponsorsData) {
    const container = document.getElementById('sponsors-container');
    if (!container) return;
    container.innerHTML = '';

    sponsorsData.forEach(sponsor => {
        const sponsorHTML = `
            <a href="${sponsor.link}" target="_blank" rel="noopener" class="block bg-white p-6 rounded-2xl shadow-md flex items-center justify-center h-32 md:h-40 card-hover">
                <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-logo max-h-16 w-auto transition-all duration-300">
            </a>`;
        container.innerHTML += sponsorHTML;
    });
}

// ============================================
// 11. SOBRE O EVENTO
// ============================================

/**
 * Renderiza os cards do "Sobre"
 */
function renderAboutCards(aboutData) {
    const container = document.getElementById('about-cards-container');
    if (!container) return;
    container.innerHTML = '';

    aboutData.forEach(card => {
        const cardHTML = `
            <div class="bg-white rounded-2xl shadow-lg p-6 text-center card-hover border-t-4 border-${card.color}-500">
                <div class="w-16 h-16 bg-${card.color}-100 text-${card.color}-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas ${card.icon} text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${card.title}</h3>
                <p class="text-gray-600">${card.description}</p>
            </div>`;
        container.innerHTML += cardHTML;
    });
}

// ============================================
// 12. GALERIA COM PAGINAÇÃO
// ============================================

/**
 * Renderiza a galeria de fotos com paginação
 */
function renderGallery(page = 1) {
    const container = document.getElementById('gallery-container');
    const paginationContainer = document.getElementById('gallery-pagination-container');
    if (!container || !paginationContainer) return;

    // Limpa o container
    container.innerHTML = '';

    // Calcula o índice de início e fim
    const startIndex = (page - 1) * CONFIG.imagesPerLoad;
    const endIndex = startIndex + CONFIG.imagesPerLoad;
    const imagesToRender = AppState.gallery.filteredImages.slice(startIndex, endIndex);

    // Renderiza as imagens
    imagesToRender.forEach(item => {
        const galleryItemHTML = `
            <div class="gallery-item group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-white p-1.5 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 ${item.span || ''}" data-src="${item.src}">
                <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110">
            </div>
        `;
        container.insertAdjacentHTML('beforeend', galleryItemHTML);
    });

    // Atualiza a paginação
    updatePagination(page);

    // Reinicializa o lightbox
    initializeLightbox();
}

/**
 * Atualiza os controles de paginação
 */
function updatePagination(currentPage) {
    const paginationContainer = document.getElementById('gallery-pagination-container');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');

    if (!paginationContainer || !paginationNumbers) return;

    // Calcula o total de páginas
    const totalPages = Math.ceil(AppState.gallery.filteredImages.length / CONFIG.imagesPerLoad);

    // Se não há imagens ou só há uma página, esconde a paginação
    if (totalPages <= 1) {
        paginationContainer.classList.add('hidden');
        return;
    }

    // Mostra a paginação
    paginationContainer.classList.remove('hidden');

    // Atualiza estado dos botões anterior/próximo
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Renderiza os números de página
    paginationNumbers.innerHTML = '';

    // Lógica para mostrar números de página (máximo 5 botões)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Ajusta se estiver muito no início ou no fim
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }

    // Adiciona primeiro número se necessário
    if (startPage > 1) {
        paginationNumbers.innerHTML += createPageButton(1, currentPage);
        if (startPage > 2) {
            paginationNumbers.innerHTML += '<span class="flex items-center px-2 text-gray-500">...</span>';
        }
    }

    // Adiciona números de página
    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.innerHTML += createPageButton(i, currentPage);
    }

    // Adiciona último número se necessário
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationNumbers.innerHTML += '<span class="flex items-center px-2 text-gray-500">...</span>';
        }
        paginationNumbers.innerHTML += createPageButton(totalPages, currentPage);
    }

    // Adiciona eventos de clique aos botões de número
    setupPaginationEvents(currentPage);
}

/**
 * Cria um botão de número de página
 */
function createPageButton(pageNum, currentPage) {
    const isActive = pageNum === currentPage;
    const activeClasses = isActive
        ? 'bg-blue-900 text-white'
        : 'bg-white text-blue-900 hover:bg-blue-100';

    return `
        <button 
            class="pagination-page-btn w-10 h-10 rounded-full font-semibold transition duration-200 ${activeClasses}" 
            data-page="${pageNum}"
            ${isActive ? 'aria-current="page"' : ''}
        >
            ${pageNum}
        </button>
    `;
}

/**
 * Configura eventos de clique nos controles de paginação
 */
function setupPaginationEvents(currentPage) {
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');
    const pageButtons = document.querySelectorAll('.pagination-page-btn');

    // Remove listeners antigos clonando os botões
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.replaceWith(newPrevBtn);
    nextBtn.replaceWith(newNextBtn);

    // Adiciona novos eventos
    newPrevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            AppState.gallery.currentPage = currentPage - 1;
            renderGallery(AppState.gallery.currentPage);
            scrollToGallery();
        }
    });

    newNextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(AppState.gallery.filteredImages.length / CONFIG.imagesPerLoad);
        if (currentPage < totalPages) {
            AppState.gallery.currentPage = currentPage + 1;
            renderGallery(AppState.gallery.currentPage);
            scrollToGallery();
        }
    });

    // Eventos para botões de número de página
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            AppState.gallery.currentPage = page;
            renderGallery(page);
            scrollToGallery();
        });
    });
}

/**
 * Scroll suave para o topo da galeria
 */
function scrollToGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = gallery.offsetTop - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}

/**
 * Configura a galeria e os filtros
 */
function setupGallery(galleryData) {
    AppState.gallery.allImages = galleryData;
    AppState.gallery.filteredImages = [...galleryData];
    AppState.gallery.currentPage = 1;
    renderGallery(1);

    // Configura os botões de filtro
    const filterButtons = document.querySelectorAll('.gallery-day-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const day = button.getAttribute('data-day');
            if (day === 'all') {
                AppState.gallery.filteredImages = [...AppState.gallery.allImages];
            } else {
                AppState.gallery.filteredImages = AppState.gallery.allImages.filter(img => img.day == day);
            }

            // Volta para a primeira página ao filtrar
            AppState.gallery.currentPage = 1;
            renderGallery(1);
        });
    });
}

/**
 * Configura o lightbox (funcionalidade global)
 */
function setupLightboxGlobal() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox) return;

    // Fechar lightbox
    const closeLightbox = (e) => {
        // Não fecha se clicar no botão de download
        if (e.target.closest('#lightbox-download')) {
            return;
        }

        if (e.target === lightbox || e.target.closest('#lightbox-close')) {
            lightbox.classList.add('hidden');
        }
    };

    lightbox.addEventListener('click', closeLightbox);

    // Evento específico para o botão de fechar
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }
}

/**
 * Inicializa os eventos de clique nas imagens da galeria
 */
function initializeLightbox() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDownload = document.getElementById('lightbox-download');
    const galleryItems = galleryContainer.querySelectorAll('.gallery-item');

    // Evento de clique nas imagens da galeria
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightbox.classList.remove('hidden');
            lightboxImg.src = src;
            lightboxDownload.href = src;
        });
    });

    // Função de download corrigida
    const downloadImage = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const urlToDownload = lightboxDownload.getAttribute('href');

        try {
            const response = await fetch(urlToDownload);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Extrai o nome do arquivo da URL
            let fileName = 'secrateus-imagem.jpg';

            try {
                const urlPath = new URL(urlToDownload, window.location.origin).pathname;
                const fileNameFromUrl = urlPath.split('/').pop();

                if (fileNameFromUrl && fileNameFromUrl.includes('.')) {
                    fileName = fileNameFromUrl;
                } else {
                    // Se não tem extensão, determina pela MIME type
                    const mimeType = blob.type;
                    const extension = mimeType.split('/')[1] || 'jpg';
                    fileName = `secrateus-${Date.now()}.${extension}`;
                }
            } catch (error) {
                // Usa nome padrão com timestamp se houver erro
                fileName = `secrateus-${Date.now()}.jpg`;
            }

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            // Aguarda um pouco antes de revogar a URL
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                a.remove();
            }, 100);
        } catch (err) {
            console.error('Erro ao baixar:', err);
            alert('Não foi possível baixar a imagem.');
        }
    };

    // Remove eventos antigos para evitar duplicação
    lightboxDownload.replaceWith(lightboxDownload.cloneNode(true));
    const newLightboxDownload = document.getElementById('lightbox-download');
    newLightboxDownload.addEventListener('click', downloadImage);
}

// ============================================
// 13. CARREGAMENTO DE DADOS JSON
// ============================================

/**
 * Função genérica para carregar e renderizar dados JSON
 */
async function loadAndRender(url, renderFn, containerId, errorMsg) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderFn(data);
    } catch (error) {
        console.error(`Could not load data from ${url}:`, error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">${errorMsg}</p>`;
        }
    }
}

/**
 * Carrega todos os dados JSON em paralelo
 */
function loadAllData() {
    Promise.allSettled([
        loadAndRender('assets/js/competitions.json', renderCompetitions, 'competitions-container', 'Não foi possível carregar as competições.'),
        loadAndRender('assets/js/program.json', renderProgram, 'day1', 'Não foi possível carregar a programação.'),
        loadAndRender('assets/js/previous-editions.json', renderPreviousEditions, 'previous-editions-container', 'Não foi possível carregar as edições anteriores.'),
        loadAndRender('assets/js/speakers.json', renderSpeakers, 'speakers-container', 'Não foi possível carregar os palestrantes.'),
        loadAndRender('assets/js/sponsors.json', renderSponsors, 'sponsors-container', 'Não foi possível carregar os patrocinadores.'),
        loadAndRender('assets/js/about.json', renderAboutCards, 'about-cards-container', 'Não foi possível carregar os detalhes do evento.'),
        loadAndRender('assets/js/gallery.json', setupGallery, 'gallery-container', 'Não foi possível carregar a galeria de fotos.')
    ]);
}

// ============================================
// 14. INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

/**
 * Inicializa todos os módulos da aplicação
 */
function initializeApp() {
    // Navegação
    initNavbarScroll();
    initScrollSpy();
    initSmoothScroll();

    // Menu
    initMobileMenu();

    // Countdown
    initCountdown();

    // Programação
    initProgramDays();

    // Galeria
    setupLightboxGlobal();

    // Carrega todos os dados JSON
    loadAllData();
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeApp);