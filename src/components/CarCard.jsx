import ChartComponent from './ChartComponent';
import './CarCard.css';

const CarCard = ({ carNum, battery, voltage, current, history }) => {
    const getBatteryClass = () => {
        if (battery < 30) return 'battery-fill low';
        if (battery < 70) return 'battery-fill medium';
        return 'battery-fill';
    };

    const datasets = [
        {
            label: 'Battery (%)',
            data: history.battery,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4
        }
    ];

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">🚗 Car {carNum}</div>
            </div>
            <div className="battery-container">
                <div className="battery-label">Battery Level</div>
                <div className="battery-bar">
                    <div className={getBatteryClass()} style={{ width: `${battery}%` }}>
                        {battery}%
                    </div>
                </div>
            </div>
            <div className="metrics-grid">
                <div className="metric">
                    <div className="metric-label">Voltage</div>
                    <div className="metric-value">
                        {voltage.toFixed(2)}
                        <span className="metric-unit">V</span>
                    </div>
                </div>
                <div className="metric">
                    <div className="metric-label">Current</div>
                    <div className="metric-value">
                        {current.toFixed(2)}
                        <span className="metric-unit">A</span>
                    </div>
                </div>
            </div>
            <div className="chart-container">
                <ChartComponent labels={history.labels} datasets={datasets} />
            </div>
        </div>
    );
};

export default CarCard;
