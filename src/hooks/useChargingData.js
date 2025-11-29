import { useState, useEffect } from 'react';
import { useFirebaseValue } from '../firebase/hooks';

export const useStationData = (stationNum) => {
    const { value: voltage } = useFirebaseValue(`Quick_Charging_Station/Voltage${stationNum}`);
    const { value: current } = useFirebaseValue(`Quick_Charging_Station/Current${stationNum}`);
    const { value: stationStatus } = useFirebaseValue(`Quick_Charging_Station/Station${stationNum}`);
    const { value: quickStatus } = useFirebaseValue('Quick_Charging_Station/Quick');

    const [history, setHistory] = useState({ voltage: [], current: [], labels: [] });

    useEffect(() => {
        if (voltage !== null && current !== null) {
            const time = new Date().toLocaleTimeString();
            setHistory(prev => {
                const newHistory = {
                    voltage: [...prev.voltage, voltage],
                    current: [...prev.current, current],
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
    }, [voltage, current]);

    const isOccupied = stationStatus === "1" || (stationNum === 2 && stationStatus === "2");
    const isQuickCharging = quickStatus === String(stationNum);

    return {
        voltage: voltage || 0,
        current: current || 0,
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
