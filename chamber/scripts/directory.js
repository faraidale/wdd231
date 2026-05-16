// 1. Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// 2. Hamburger Menu
const menuBtn = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
});

// 3. Fetch Data & Build Directory
const url = 'data/members.json';
const directory = document.querySelector('#directory-container');

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank">Website</a>
        `;
        directory.appendChild(card);
    });
}

getMembers();

// 4. Grid/List View Toggle
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
});
