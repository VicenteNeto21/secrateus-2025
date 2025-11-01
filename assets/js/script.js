// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('nav-scrolled');
        navbar.classList.remove('py-3');
        navbar.classList.add('py-4');
    }
});

// Scrollspy for active nav link
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link-desktop, .nav-link-mobile');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '-50% 0px -50% 0px', // trigger at the vertical center of the viewport
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
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuContainer = document.getElementById('mobile-menu-container');
const menuOverlay = document.getElementById('menu-overlay');
const menuIcon = menuBtn.querySelector('i');
const navLinks = document.querySelectorAll('.nav-link-mobile');

function toggleMenu() {
    const isOpen = menuContainer.classList.contains('active');
    
    if (isOpen) {
        // Close menu
        menuContainer.classList.remove('active');
        menuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        menuIcon.classList.replace('fa-times', 'fa-bars');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir menu');
    } else {
        // Open menu
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

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Program day switching
document.querySelectorAll('.program-day').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.program-day').forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.setAttribute('aria-pressed', 'true');
        this.classList.add('active');
        
        // Hide all program content
        document.querySelectorAll('.program-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show selected day content
        const day = this.getAttribute('data-day');
        document.getElementById(day).classList.remove('hidden');
    });
});

// Load Competitions from JSON
async function loadCompetitions() {
    try {
        const response = await fetch('assets/js/competitions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const competitionsData = await response.json();
        renderCompetitions(competitionsData);
    } catch (error) {
        console.error("Could not load competitions data:", error);
        const container = document.getElementById('competitions-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">Não foi possível carregar as competições. Tente novamente mais tarde.</p>`;
        }
    }
}

function renderCompetitions(competitionsData) {
    const container = document.getElementById('competitions-container');
    if (!container) return;
    container.innerHTML = '';

    competitionsData.forEach(comp => {
        const requirementsHTML = comp.requirements.map(req => `<li>${req}</li>`).join('');

        const competitionHTML = `
            <div class="bg-gradient-to-br from-${comp.color}-50 to-${comp.color}-100 rounded-2xl shadow-lg overflow-hidden card-hover">
                <div class="p-6 md:p-8">
                    <div class="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                        <h3 class="text-xl md:text-2xl font-bold text-gray-800">${comp.title}</h3>
                        <div class="bg-${comp.color}-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                            <i class="fas fa-trophy mr-1"></i> ${comp.prize}
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">${comp.description}</p>
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-800 mb-2">Requisitos:</h4>
                        <ul class="text-gray-600 list-disc pl-5 space-y-1">${requirementsHTML}</ul>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-${comp.color}-200">
                        <div class="text-sm text-gray-500"><i class="far fa-calendar mr-1"></i> ${comp.date}</div>
                        <div class="flex items-center gap-3 mt-4 sm:mt-0">
                            <a href="${comp.editalLink}" target="_blank" rel="noopener" class="border border-${comp.color}-500 text-${comp.color}-500 px-4 py-2 rounded-lg font-bold hover:bg-${comp.color}-50 transition duration-200 text-sm whitespace-nowrap">Ler Edital</a>
                            <a href="#registration" class="bg-${comp.color}-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-${comp.color}-600 transition duration-200 text-sm flex items-center gap-2 whitespace-nowrap"><i class="fas fa-user-plus"></i> Inscrever-se</a>
                        </div>
                    </div>
                </div>
            </div>`;
        container.innerHTML += competitionHTML;
    });
}

// Load Program from JSON
async function loadProgram() {
    try {
        const response = await fetch('assets/js/program.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const programData = await response.json();
        renderProgram(programData);
    } catch (error) {
        console.error("Could not load program data:", error);
        const programContainer = document.querySelector('.lg\\:w-3\\/4');
        if(programContainer) {
            programContainer.innerHTML = `<p class="text-center text-red-500">Não foi possível carregar a programação. Tente novamente mais tarde.</p>`;
        }
    }
}

function renderProgram(programData) {
    const containers = {
        1: document.getElementById('day1'),
        2: document.getElementById('day2')
    };

    if (!containers[1] || !containers[2]) return;

    Object.values(containers).forEach(c => c.innerHTML = '');

    programData.forEach(event => {
        const registrationHTML = event.registration ?
            `<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                    <i class="fas fa-trophy mr-1"></i> Prêmio: ${event.prize}
                </div>
                <a href="#registration" class="bg-${event.color}-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-${event.color}-600 transition duration-200 whitespace-nowrap">Inscrever-se</a>
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
                        <p class="text-gray-600 mb-4">${event.description}</p>
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

    // Re-initialize the active day
    document.querySelector('.program-day.active').click();
}

// Countdown timer
function updateCountdown() {
    const eventDate = new Date('2025-11-26T00:00:00');
    const now = new Date();
    const diff = eventDate - now;
    
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = `
            <div class="text-xs sm:text-sm">O EVENTO</div>
            <div class="text-xl sm:text-2xl">COMEÇOU!</div>
        `;
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    document.getElementById('countdown').innerHTML = `
        <div class="text-xs sm:text-sm">FALTAM</div>
        <div class="text-xl sm:text-2xl">${days} dias</div>
    `;
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour

// Smooth scrolling for navigation links
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

// Load Previous Editions from JSON
async function loadPreviousEditions() {
    try {
        const response = await fetch('assets/js/previous-editions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const editionsData = await response.json();
        renderPreviousEditions(editionsData);
    } catch (error) {
        console.error("Could not load previous editions data:", error);
        const container = document.getElementById('previous-editions-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">Não foi possível carregar as edições anteriores.</p>`;
        }
    }
}

function renderPreviousEditions(editionsData) {
    const container = document.getElementById('previous-editions-container');
    if (!container) return;
    container.innerHTML = '';

    editionsData.forEach(edition => {
        const tagsHTML = edition.tags.map(tag => `<span class="bg-${edition.color}-100 text-${edition.color}-800 px-2 py-1 rounded text-xs font-medium">${tag}</span>`).join('');

        const editionHTML = `
            <a href="${edition.link}" target="_blank" rel="noopener" class="block bg-white rounded-2xl shadow-lg overflow-hidden card-hover group border-t-4 border-${edition.color}-500">
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
                    <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">${tagsHTML}</div>
                </div>
            </a>`;
        container.innerHTML += editionHTML;
    });
}

// Load News from JSON
async function loadNews() {
    try {
        const response = await fetch('assets/js/news.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newsData = await response.json();
        renderNews(newsData);
    } catch (error) {
        console.error("Could not load news data:", error);
        const container = document.getElementById('news-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500">Não foi possível carregar as novidades.</p>`;
        }
    }
}

function renderNews(newsData) {
    const container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = '';

    newsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'flex-shrink-0 w-4/5 sm:w-1/2 lg:w-1/3 scroll-snap-start';
        card.innerHTML = `
            <a href="${item.link}" class="block rounded-2xl shadow-lg card-hover overflow-hidden group relative h-80">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute inset-0 news-card-overlay"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div class="news-card-content">
                        <h3 class="text-2xl font-bold">${item.title}</h3>
                        <p class="text-yellow-300 font-semibold">${item.category}</p>
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });

    setupNewsCarouselControls();
}

function setupNewsCarouselControls() {
    const container = document.getElementById('news-container');
    const prevBtn = document.getElementById('news-prev');
    const nextBtn = document.getElementById('news-next');

    if (!container || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
        const cardWidth = container.querySelector('.scroll-snap-start').offsetWidth;
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = container.querySelector('.scroll-snap-start').offsetWidth;
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
}

// Load Sponsors from JSON
async function loadSponsors() {
    try {
        const response = await fetch('assets/js/sponsors.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sponsorsData = await response.json();
        renderSponsors(sponsorsData);
    } catch (error) {
        console.error("Could not load sponsors data:", error);
        const container = document.getElementById('sponsors-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">Não foi possível carregar os patrocinadores.</p>`;
        }
    }
}

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

// Load About Cards from JSON
async function loadAboutCards() {
    try {
        const response = await fetch('assets/js/about.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const aboutData = await response.json();
        renderAboutCards(aboutData);
    } catch (error) {
        console.error("Could not load about cards data:", error);
        const container = document.getElementById('about-cards-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">Não foi possível carregar os detalhes do evento.</p>`;
        }
    }
}

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

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCompetitions();
    loadProgram();
    updateCountdown();
    loadPreviousEditions();
    loadNews();
    loadSponsors();
    loadAboutCards();
});