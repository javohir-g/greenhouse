const https = require('https');

// Your Render URL (replace with your actual URL)
const RENDER_URL = 'https://greenhouse-1ue7.onrender.com'; // e.g., 'https://your-app-name.onrender.com'

// Function to make the request
function keepAlive() {
    console.log('Making keep-alive request...');
    
    https.get(RENDER_URL, (res) => {
        const { statusCode } = res;
        console.log(`Server responded with status: ${statusCode}`);
        
        // Consume response data to free up memory
        res.resume();
    }).on('error', (err) => {
        console.error('Error making request:', err.message);
    });
}

// Make a request every 14 minutes
// Render free tier sleeps after 15 minutes of inactivity
const INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

// Initial request
keepAlive();

// Schedule recurring requests
setInterval(keepAlive, INTERVAL);

console.log(`Keep-alive service started. Making requests every ${INTERVAL/1000/60} minutes.`); 