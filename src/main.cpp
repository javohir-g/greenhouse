#define BLYNK_TEMPLATE_ID "YOUR_TEMPLATE_ID"
#define BLYNK_DEVICE_NAME "ESP32_Relay_Temp"
#define BLYNK_AUTH_TOKEN "YOUR_AUTH_TOKEN"

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>

// WiFi credentials
char ssid[] = "YOUR_WIFI_SSID";
char pass[] = "YOUR_WIFI_PASSWORD";

// Pin definitions
#define RELAY_PIN 2  // GPIO2 for relay control
#define DHTPIN 4     // GPIO4 for DHT sensor
#define DHTTYPE DHT22   // DHT22 sensor type

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

// Timer for sensor readings
BlynkTimer timer;

// Function to read and send sensor data
void sendSensorData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Send temperature and humidity to Blynk
  Blynk.virtualWrite(V0, temperature);
  Blynk.virtualWrite(V1, humidity);
}

// Relay control function
BLYNK_WRITE(V2) {
  int relayState = param.asInt();
  digitalWrite(RELAY_PIN, relayState);
}

void setup() {
  // Initialize Serial
  Serial.begin(115200);

  // Initialize DHT sensor
  dht.begin();

  // Set relay pin as output
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  // Connect to Blynk
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);

  // Setup a function to be called every second
  timer.setInterval(1000L, sendSensorData);
}

void loop() {
  Blynk.run();
  timer.run();
} 