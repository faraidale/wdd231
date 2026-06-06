import { places } from '../data/places.mjs';

// 1. Build the Discover Cards
const grid = document.getElementById('discover-grid');

if (grid) {
    places.forEach((place) => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        grid.appendChild(card);
    });
}

// 2. Local Storage Visit Message Logic
const messageArea = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const rightNow = Date.now();

if (messageArea) {
    if (!lastVisit) {
        // First visit
        messageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate days between visits
        const msToDays = 84600000; // milliseconds in a day
        const daysBetween = Math.floor((rightNow - parseInt(lastVisit)) / msToDays);

        if (daysBetween < 1) {
            messageArea.textContent = "Back so soon! Awesome!";
        } else {
            messageArea.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
        }
    }
    // Update local storage to the current time for the next visit
    localStorage.setItem('lastVisit', rightNow);
}
