# 🌤️ Tugo's Weather App – Chrome Extension

A privacy-first, modern Chrome extension that displays current weather and 5-day forecasts for any city worldwide.  
Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

> 🧩 Published on Chrome Web Store:  
> https://chromewebstore.google.com/detail/kelfigfhomnnebheemdoobjedlcbohfa?utm_source=item-share-cb

---

## 🚀 Features

- Current weather (temperature, humidity, wind, conditions)
- 5-day forecast with daily summaries
- Location search for any city worldwide
- Toggle between °C / °F
- Privacy-first: No data collection or tracking — your OpenWeather API key is stored locally
- Modern UI: Responsive, minimal, and fast

---

## 🛠️ Technologies Used

- **React.js** – UI library for building components
- **TypeScript** – Type-safe JavaScript
- **Vite** – Fast bundler and development server
- **Tailwind CSS** – Utility-first CSS framework
- **Chrome Extensions API (Manifest V3)** – For browser extension functionality
- **OpenWeather API** – For real-time weather and forecast data
- **ESLint** – Code linting and style enforcement
- **PostCSS** – CSS transformation and optimization
- **Git** – Version control

---

## ⚙️ Getting Started

### 🔑 How to Get an OpenWeather API Key

1. Visit https://openweathermap.org/
2. Sign up or log in
3. Click your profile icon and go to “My API keys”
4. Click “Create Key” and name it (e.g., "Tugo Weather App")
5. Copy the generated API key
6. Paste it into the extension’s Options page after installing

### 🧪 Local Development

#### 1. Clone the repository


'git clone https://github.com/yourusername/weather-extension.git'
'cd weather-extension'


#### 2. Install dependencies

'npm install'


#### 3. Development build (for popup preview)

npm run dev
Open 'http://localhost:5173' to preview the popup in your browser.


#### 4. Build for Chrome Extension

'npm run build'
This will generate a dist/ folder with all extension files.

#### 5. Load the extension in Chrome

Open chrome://extensions (enable Developer mode)
Click Load unpacked
Select the dist/ folder


## 🔑 How to Use
First time use:
1. Click the extension icon. You’ll be prompted to enter your own OpenWeather API key in the Options page.

2. Search any city to get current weather and forecast.

3. Toggle between °C and °F as needed.

## 🔒 Privacy
No personal data is collected, stored, or shared.

Your API key and preferences are only stored locally in your browser.

All weather data is fetched directly from OpenWeather.

## 🖼️ Screenshots

![alt text](image.png)

## 📦 Contributing

Pull requests and issues are welcome!

## 📄 License

MIT

## 🙋 Questions?

Open an issue or contact [tuguldur.js83@gmail.com or github.com/Tuguldurs526].
