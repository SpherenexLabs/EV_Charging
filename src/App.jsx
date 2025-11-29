import { useState, useEffect } from 'react';
import StationCard from './components/StationCard';
import CarCard from './components/CarCard';
import ConnectionStatus from './components/ConnectionStatus';
import { useStationData, useCarData } from './hooks/useChargingData';
import { useConnectionStatus } from './firebase/hooks';
import './App.css';

function App() {
    const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());
    const connected = useConnectionStatus();

    const station1 = useStationData(1);
    const station2 = useStationData(2);
    const car1 = useCarData(1);
    const car2 = useCarData(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <ConnectionStatus connected={connected} />

            <div className="dashboard-header">
                <h1>⚡ EV Charging Station Dashboard</h1>
                <p>Real-time monitoring and analytics</p>
            </div>

            <div className="dashboard-container">
                {/* Charging Stations Section */}
                <div className="stations-section">
                    <h2 className="section-title">Charging Stations</h2>
                    <div className="grid-container">
                        <StationCard
                            stationNum={1}
                            voltage={station1.voltage}
                            current={station1.current}
                            isOccupied={station1.isOccupied}
                            isQuickCharging={station1.isQuickCharging}
                            history={station1.history}
                        />
                        <StationCard
                            stationNum={2}
                            voltage={station2.voltage}
                            current={station2.current}
                            isOccupied={station2.isOccupied}
                            isQuickCharging={station2.isQuickCharging}
                            history={station2.history}
                        />
                    </div>
                </div>

                {/* Cars Section */}
                <div className="cars-section">
                    <h2 className="section-title">Vehicle Status</h2>
                    <div className="grid-container">
                        <CarCard
                            carNum={1}
                            battery={car1.battery}
                            voltage={car1.voltage}
                            current={car1.current}
                            history={car1.history}
                        />
                        <CarCard
                            carNum={2}
                            battery={car2.battery}
                            voltage={car2.voltage}
                            current={car2.current}
                            history={car2.history}
                        />
                    </div>
                </div>

                <div className="last-update">
                    Last updated: {lastUpdate}
                </div>
            </div>
        </>
    );
}

export default App;
