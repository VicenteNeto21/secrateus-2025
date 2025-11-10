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
                        <a href="${comp.registrationLink}" target="_blank" rel="noopener" class="w-full block bg-${comp.color}-500 text-white text-center px-4 py-3 rounded-lg font-bold hover:bg-${comp.color}-600 transition duration-200 text-base flex items-center justify-center gap-2">
                            <i class="fas fa-user-plus"></i> Inscrever-se
                        </a>
                        <a href="${comp.editalLink}" target="_blank" rel="noopener" class="w-full block text-center text-gray-600 mt-3 font-semibold hover:text-${comp.color}-600 transition duration-200 text-sm">
                            Ler o edital completo
                        </a>
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

    // --- Dynamic Legend ---
    const legendContainer = document.getElementById('program-legend');
    if (legendContainer) {
        // Extrai tipos e cores únicos do JSON
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
    // --- End Dynamic Legend ---

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

// Load Speakers from JSON
async function loadSpeakers() {
    try {
        const response = await fetch('assets/js/speakers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const speakersData = await response.json();
        renderSpeakers(speakersData);
    } catch (error) {
        console.error("Could not load speakers data:", error);
        const container = document.getElementById('speakers-container');
        if(container) {
            container.innerHTML = `<p class="text-center text-red-500 col-span-full">Não foi possível carregar os palestrantes.</p>`;
        }
    }
}

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

/**
 * Fetches a JSON resource and calls a render function with the data.
 * Handles errors gracefully by displaying a message in the container.
 * @param {string} url - The URL of the JSON file.
 * @param {function} renderFn - The function to call with the fetched data.
 * @param {string} containerId - The ID of the container to show an error message.
 * @param {string} errorMsg - The error message to display.
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

function initializeApp() {
    updateCountdown();

    Promise.all([
        loadAndRender('assets/js/competitions.json', renderCompetitions, 'competitions-container', 'Não foi possível carregar as competições.'),
        loadAndRender('assets/js/program.json', renderProgram, 'day1', 'Não foi possível carregar a programação.'),
        loadAndRender('assets/js/previous-editions.json', renderPreviousEditions, 'previous-editions-container', 'Não foi possível carregar as edições anteriores.'),
        loadAndRender('assets/js/speakers.json', renderSpeakers, 'speakers-container', 'Não foi possível carregar os palestrantes.'),
        loadAndRender('assets/js/sponsors.json', renderSponsors, 'sponsors-container', 'Não foi possível carregar os patrocinadores.'),
        loadAndRender('assets/js/about.json', renderAboutCards, 'about-cards-container', 'Não foi possível carregar os detalhes do evento.')
    ]);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeApp);