# EV Charging Station Dashboard

A real-time EV charging station monitoring dashboard built with React and Vite, featuring Firebase integration for live data updates.

## Features

- 🔌 Real-time monitoring of multiple charging stations
- 🚗 Vehicle battery status tracking
- 📊 Live data visualization with Chart.js
- ⚡ Quick charging detection and status updates
- 📱 Responsive design for mobile and desktop
- 🔥 Firebase Realtime Database integration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account and project

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your Firebase project credentials:
     - `apiKey`
     - `messagingSenderId`
     - `appId`

## Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── StationCard.jsx
│   │   ├── CarCard.jsx
│   │   ├── ChartComponent.jsx
│   │   └── ConnectionStatus.jsx
│   ├── firebase/         # Firebase configuration
│   │   ├── config.js
│   │   └── hooks.js
│   ├── hooks/           # Custom React hooks
│   │   └── useChargingData.js
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Firebase Database Structure

The application expects the following Firebase Realtime Database structure:

```
Quick_Charging_Station/
  ├── Voltage1: number
  ├── Current1: number
  ├── Voltage2: number
  ├── Current2: number
  ├── Station1: string ("0" or "1")
  ├── Station2: string ("0" or "2")
  ├── Quick: string ("1" or "2")
  ├── Battery1: number (0-100)
  ├── Battery2: number (0-100)
  ├── Car1V: number
  ├── Car1C: number
  ├── Car2V: number
  └── Car2C: number
```

## Technologies Used

- React 18
- Vite
- Firebase 10
- Chart.js 4
- react-chartjs-2

## License

MIT
