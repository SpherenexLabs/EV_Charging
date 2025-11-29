import './ConnectionStatus.css';

const ConnectionStatus = ({ connected }) => {
    return (
        <div className={`connection-status ${connected ? '' : 'disconnected'}`}>
            ● {connected ? 'Connected' : 'Disconnected'}
        </div>
    );
};

export default ConnectionStatus;
