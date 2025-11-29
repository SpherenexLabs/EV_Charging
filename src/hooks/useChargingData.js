import { useState, useEffect } from 'react';
import { useFirebaseValue } from '../firebase/hooks';

export const useStationData = (stationNum) => {
    const { value: voltageFromDB } = useFirebaseValue(`Quick_Charging_Station/Voltage${stationNum}`);
    const { value: currentFromDB } = useFirebaseValue(`Quick_Charging_Station/Current${stationNum}`);
    const { value: stationStatus } = useFirebaseValue(`Quick_Charging_Station/Station${stationNum}`);
    const { value: quickStatus } = useFirebaseValue('Quick_Charging_Station/Quick');

    const [history, setHistory] = useState({ voltage: [], current: [], labels: [] });
    const [displayCurrent, setDisplayCurrent] = useState(0);

    // Determine charging states
    const isQuickCharging = quickStatus === String(stationNum);
    const isOccupied = stationStatus === "1" && !isQuickCharging;

    // Handle current value based on status
    useEffect(() => {
        if (isQuickCharging) {
            // Quick charging: generate random current between 4.5 and 5
            const interval = setInterval(() => {
                const randomCurrent = 4.5 + Math.random() * 0.5; // 4.5 to 5.0
                setDisplayCurrent(randomCurrent);
            }, 1000); // Update every second

            return () => clearInterval(interval);
        } else if (isOccupied) {
            // Occupied: use current from Firebase
            setDisplayCurrent(currentFromDB || 0);
        } else {
            // Available: use current from Firebase or 0
            setDisplayCurrent(currentFromDB || 0);
        }
    }, [isQuickCharging, isOccupied, currentFromDB]);

    // Determine voltage display
    const displayVoltage = isOccupied ? (voltageFromDB || 0) - 1 : (voltageFromDB || 0);

    useEffect(() => {
        if (displayVoltage !== null && displayCurrent !== null) {
            const time = new Date().toLocaleTimeString();
            setHistory(prev => {
                const newHistory = {
                    voltage: [...prev.voltage, displayVoltage],
                    current: [...prev.current, displayCurrent],
                    labels: [...prev.labels, time]
                };

                // Keep only last 20 points
                if (newHistory.labels.length > 20) {
                    newHistory.voltage.shift();
                    newHistory.current.shift();
                    newHistory.labels.shift();
                }

                return newHistory;
            });
        }
    }, [displayVoltage, displayCurrent]);

    return {
        voltage: displayVoltage,
        current: displayCurrent,
        isOccupied,
        isQuickCharging,
        history
    };
};

export const useCarData = (carNum) => {
    const { value: battery } = useFirebaseValue(`Quick_Charging_Station/Battery${carNum}`);
    const { value: voltage } = useFirebaseValue(`Quick_Charging_Station/Car${carNum}V`);
    const { value: current } = useFirebaseValue(`Quick_Charging_Station/Car${carNum}C`);

    const [history, setHistory] = useState({ battery: [], labels: [] });

    useEffect(() => {
        if (battery !== null) {
            const time = new Date().toLocaleTimeString();
            setHistory(prev => {
                const newHistory = {
                    battery: [...prev.battery, battery],
                    labels: [...prev.labels, time]
                };

                // Keep only last 20 points
                if (newHistory.labels.length > 20) {
                    newHistory.battery.shift();
                    newHistory.labels.shift();
                }

                return newHistory;
            });
        }
    }, [battery]);

    return {
        battery: battery || 0,
        voltage: voltage || 0,
        current: current || 0,
        history
    };
};
