// Blynk configuration
const BLYNK_AUTH_TOKEN = 'hAp-BAQHAVOWyymiUU34ujcHg3Wi3JxZ';
const BLYNK_SERVER = 'https://blynk.cloud/external/api';

// DOM elements
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windowButton = document.getElementById('windowButton');
const fanButton = document.getElementById('fanButton');
const pumpButton = document.getElementById('pumpButton');
const connectionStatus = document.getElementById('connectionStatus');

// State variables
let windowState = false;
let fanState = false;
let pumpState = false;
let isConnected = true; // HTTP is stateless, so we'll assume connected

// Function to update sensor data
async function updateSensorData() {
    try {
        // Get temperature
        const tempResponse = await fetch(`${BLYNK_SERVER}/get?token=${BLYNK_AUTH_TOKEN}&V0`);
        const temperature = await tempResponse.text();
        temperatureElement.textContent = `${temperature}°C`;

        // Get humidity
        const humResponse = await fetch(`${BLYNK_SERVER}/get?token=${BLYNK_AUTH_TOKEN}&V1`);
        const humidity = await humResponse.text();
        humidityElement.textContent = `${humidity}%`;

        connectionStatus.textContent = 'Connected';
        connectionStatus.classList.add('connected');
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        connectionStatus.textContent = 'Connection Error';
        connectionStatus.classList.remove('connected');
    }
}

// Function to send command to Blynk
async function sendCommand(pin, value) {
    try {
        const response = await fetch(`${BLYNK_SERVER}/update?token=${BLYNK_AUTH_TOKEN}&${pin}=${value}`);
        if (!response.ok) {
            throw new Error('Command failed');
        }
        console.log(`Command sent: ${pin}=${value}`);
    } catch (error) {
        console.error('Error sending command:', error);
        connectionStatus.textContent = 'Command Failed';
        connectionStatus.classList.remove('connected');
    }
}

// Window control
windowButton.addEventListener('click', () => {
    windowState = !windowState;
    windowButton.textContent = windowState ? 'Close Window' : 'Open Window';
    sendCommand('V3', windowState ? 1 : 0);
});

// Fan control
fanButton.addEventListener('click', () => {
    fanState = !fanState;
    fanButton.textContent = fanState ? 'Turn OFF Fan' : 'Turn ON Fan';
    sendCommand('V4', fanState ? 1 : 0);
});

// Pump control
pumpButton.addEventListener('click', () => {
    pumpState = !pumpState;
    pumpButton.textContent = pumpState ? 'Turn OFF Pump' : 'Turn ON Pump';
    sendCommand('V5', pumpState ? 1 : 0);
});

// Initialize and start polling
updateSensorData();
setInterval(updateSensorData, 5000); // Update every 5 seconds 