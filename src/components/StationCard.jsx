import ChartComponent from './ChartComponent';
import './StationCard.css';

const StationCard = ({ stationNum, voltage, current, isOccupied, isQuickCharging, history }) => {
    const getStatusClass = () => {
        if (isQuickCharging) return 'status-quick';
        if (isOccupied) return 'status-occupied';
        return 'status-available';
    };

    const getStatusText = () => {
        if (isQuickCharging) return '⚡ Quick Charging';
        if (isOccupied) return '🔴 Occupied';
        return '🟢 Available';
    };

    const isFastCharging = current > 30; // Consider fast charging if current > 30A

    const datasets = [
        {
            label: 'Voltage (V)',
            data: history.voltage,
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4
        },
        {
            label: 'Current (A)',
            data: history.current,
            borderColor: '#764ba2',
            backgroundColor: 'rgba(118, 75, 162, 0.1)',
            tension: 0.4
        }
    ];

    return (
        <div className={`card ${isQuickCharging ? 'quick-charging-active' : ''}`}>
            {isQuickCharging && (
                <div className="quick-charging-banner">
                    <span className="quick-icon">⚡</span>
                    <span className="quick-text">QUICK CHARGING 2.O</span>
                    {isFastCharging && <span className="fast-badge">FAST CHARGING CONNECTED</span>}
                </div>
            )}
            <div className="card-header">
                <div className="card-title">🔌 Station {stationNum}</div>
                <div className={`status-badge ${getStatusClass()}`}>
                    {getStatusText()}
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

export default StationCard;
