import { fetchProjects } from './api.mjs';

// 1. Local Storage: View Counter
const viewCountEl = document.getElementById('view-count');
if (viewCountEl) {
    let views = localStorage.getItem('portfolioViews') || 0;
    views++;
    localStorage.setItem('portfolioViews', views);
    viewCountEl.textContent = views;
}

// 2. DOM Elements
const grid = document.getElementById('project-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');

let allProjects = [];

// 3. Initialize App
async function init() {
    allProjects = await fetchProjects();
    renderProjects(allProjects);
}

// 4. Render & Array Methods (Map) + Template Literals
function renderProjects(projects) {
    if (!grid) return;
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${project.title}</h3>
            <span class="badge">${project.category}</span>
            <p>${project.description}</p>
        `;
        
        // Modal Event Listener
        card.addEventListener('click', () => {
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-desc').textContent = project.description;
            document.getElementById('modal-tech').textContent = project.tech;
            modal.showModal();
        });
        
        grid.appendChild(card);
    });
}

// 5. Array Methods (Filter)
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            renderProjects(allProjects);
        } else {
            const filtered = allProjects.filter(p => p.category === filter);
            renderProjects(filtered);
        }
    });
});

// 6. Close Modal
if (closeModal) {
    closeModal.addEventListener('click', () => modal.close());
}

// 7. Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
if (menuBtn) {
    menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
}

// 8. Dynamic Year Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Start
init();
