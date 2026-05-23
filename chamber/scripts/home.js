// 1. Mobile Menu Toggle
const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// 2. Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

// 3. OpenWeatherMap API Setup for Harare
const apiKey = 'YOUR_API_KEY_HERE'; // <--- PASTE YOUR API KEY HERE
const lat = '-17.824858'; 
const lon = '31.053028'; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Fetch Current Weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    // Using Math.round to match standard weather displays
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    currentWeatherDiv.innerHTML = `
        <p><strong>${temp}&deg;C</strong></p>
        <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <img src="${iconUrl}" alt="${desc}">
    `;
}

// Fetch 3-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('weather-forecast');
    
    // The API returns 3-hour blocks (8 per day). We filter to grab data at a specific time (e.g., 12:00:00)
    const threeDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const p = document.createElement('p');
        p.innerHTML = `<strong>${date}:</strong> ${temp}&deg;C`;
        forecastDiv.appendChild(p);
    });
}

// 4. Spotlight Members (JSON)
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();
        
        // Filter for Gold (3) or Silver (2) memberships
        // Adjust these conditions depending on how you labeled them in your JSON file (e.g., "Gold", "Silver", or 2, 3)
        const qualifiedMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3 || m.membershipLevel === "Gold" || m.membershipLevel === "Silver");
        
        // Shuffle the array randomly
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        
        // Grab exactly 3
        const selectedSpotlights = shuffled.slice(0, 3);
        
        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.log(error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        // Determine level text for display
        let levelText = "Member";
        if(member.membershipLevel === 3 || member.membershipLevel === "Gold") levelText = "Gold Member";
        if(member.membershipLevel === 2 || member.membershipLevel === "Silver") levelText = "Silver Member";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} logo">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p><em>${levelText}</em></p>
        `;
        container.appendChild(card);
    });
}

// Initialize all fetches
fetchCurrentWeather();
fetchForecast();
fetchSpotlights();

