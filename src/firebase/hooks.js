import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './config';

export const useFirebaseValue = (path) => {
    const [value, setValue] = useState(null);
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        const dbRef = ref(database, path);
        const unsubscribe = onValue(dbRef, (snapshot) => {
            setValue(snapshot.val());
            setConnected(true);
        }, (error) => {
            console.error('Firebase error:', error);
            setConnected(false);
        });

        return () => unsubscribe();
    }, [path]);

    return { value, connected };
};

export const useConnectionStatus = () => {
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        const connectedRef = ref(database, '.info/connected');
        const unsubscribe = onValue(connectedRef, (snapshot) => {
            setConnected(snapshot.val() === true);
        });

        return () => unsubscribe();
    }, []);

    return connected;
};
