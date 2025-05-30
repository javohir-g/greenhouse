# ESP32 Blynk Relay and Temperature Monitor

This project creates a Blynk app to control a relay and monitor temperature using an ESP32 board.

## Hardware Requirements

- ESP32 Development Board
- DHT22 Temperature and Humidity Sensor
- Relay Module
- Jumper Wires
- Breadboard (optional)

## Connections

### ESP32 to DHT22
- VCC -> 3.3V
- GND -> GND
- DATA -> GPIO4

### ESP32 to Relay
- VCC -> 5V
- GND -> GND
- IN -> GPIO2

## Software Setup

1. Install PlatformIO in VS Code
2. Clone this repository
3. Update the following in `src/main.cpp`:
   - `BLYNK_TEMPLATE_ID`
   - `BLYNK_AUTH_TOKEN`
   - `ssid` and `pass` with your WiFi credentials

## Blynk App Setup

1. Create a new project in Blynk
2. Add the following widgets:
   - Value Display (V0) for Temperature
   - Value Display (V1) for Humidity
   - Button (V2) for Relay Control

## Upload and Run

1. Connect your ESP32 to your computer
2. Build and upload the code using PlatformIO
3. Open Serial Monitor to check the connection status

## Features

- Real-time temperature and humidity monitoring
- Remote relay control
- Automatic data updates every second #   g r e e n h o u s e  
 