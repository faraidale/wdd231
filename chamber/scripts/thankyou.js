const currentUrl = window.location.href;
const urlParams = new URL(currentUrl).searchParams;

// Function to safely extract parameters
function getParam(paramName) {
    return urlParams.get(paramName) || "Not provided";
}

const resultsContainer = document.getElementById('results');

if (resultsContainer) {
    resultsContainer.innerHTML = `
        <p><strong>Name:</strong> ${getParam('first-name')} ${getParam('last-name')}</p>
        <p><strong>Email:</strong> ${getParam('email')}</p>
        <p><strong>Mobile:</strong> ${getParam('phone')}</p>
        <p><strong>Business Name:</strong> ${getParam('organization')}</p>
        <p><strong>Timestamp:</strong> ${new Date(getParam('timestamp')).toLocaleString()}</p>
    `;
}
