// ==========================================
// 1. Mobile Menu Toggle
// ==========================================
const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// ==========================================
// 2. Footer Dates
// ==========================================
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

// ==========================================
// 3. OpenWeatherMap API Setup for Harare
// ==========================================
const apiKey = '5b3a7d73e2dbb191f1bd5957c08b916f'; 
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
        console.log("Error fetching current weather:", error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    if (!currentWeatherDiv) return;

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Formatting the Unix timestamps for sunrise and sunset to match the wireframe
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    currentWeatherDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <img src="${iconUrl}" alt="${desc}">
            <p style="margin: 0;"><strong>${temp}&deg;C</strong><br>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        </div>
        <p style="margin: 5px 0;">High: ${Math.round(data.main.temp_max)}&deg;C</p>
        <p style="margin: 5px 0;">Low: ${Math.round(data.main.temp_min)}&deg;C</p>
        <p style="margin: 5px 0;">Humidity: ${data.main.humidity}%</p>
        <p style="margin: 5px 0;">Sunrise: ${sunriseTime}</p>
        <p style="margin: 5px 0;">Sunset: ${sunsetTime}</p>
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
        console.log("Error fetching forecast:", error);
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('weather-forecast');
    if (!forecastDiv) return;
    
    // The API returns 3-hour blocks. We filter to grab data at roughly midday (12:00:00)
    const threeDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    forecastDiv.innerHTML = ""; 
    threeDayForecast.forEach(day => {
        // Formats the date to just say the day of the week (e.g., "Wednesday") to match the wireframe
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const p = document.createElement('p');
        p.style.margin = "10px 0";
        p.innerHTML = `<strong>${date}:</strong> ${temp}&deg;C`;
        forecastDiv.appendChild(p);
    });
}

// ==========================================
// 4. Spotlight Members (JSON)
// ==========================================
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();
        
        // Filter for Gold (3) or Silver (2) memberships
        const qualifiedMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3 || m.membershipLevel === "Gold" || m.membershipLevel === "Silver");
        
        // Shuffle the array randomly
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        
        // Grab exactly 3
        const selectedSpotlights = shuffled.slice(0, 3);
        
        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.log("Error fetching members:", error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    if (!container) return;
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        let levelText = "Member";
        if(member.membershipLevel === 3 || member.membershipLevel === "Gold") levelText = "Gold Member";
        if(member.membershipLevel === 2 || member.membershipLevel === "Silver") levelText = "Silver Member";

        // Removing https:// and www. to make the display cleaner, just like the wireframe
        const cleanUrl = member.website.replace(/^https?:\/\/(www\.)?/, '');

        card.innerHTML = `
            <h3 style="margin-top: 0;">${member.name}</h3>
            <p style="margin: 0; font-size: 0.9rem; color: #555;"><em>${levelText}</em></p>
            <hr style="margin: 15px 0;">
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>EMAIL:</strong> info@${cleanUrl}</p>
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>PHONE:</strong> ${member.phone}</p>
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>URL:</strong> <a href="${member.website}" target="_blank" style="color: #333; text-decoration: none;">${cleanUrl}</a></p>
        `;
        container.appendChild(card);
    });
}

// Initialize all fetches
fetchCurrentWeather();
fetchForecast();
fetchSpotlights();
