import { useEffect, useState } from 'react';
import './assets/css/App.css'
import ParticipantsView from './views/ParticipantsView';
import SessionView from './views/SessionView';

// Define the type for a participant
export interface Participant {
    id: number;
    name: string;
    color: string;
}

function App() {
    const [viewId, setViewId] = useState('cohesion-session');
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        const currentTitle = document.title;
        setViewId(currentTitle);
        console.log(`Initialized View: ${currentTitle}`);

        window.addEventListener('message', event => {

            const message = event.data;
            console.log(message);

            switch (message.type) {
                case 'updateParticipants':
                    setParticipants((prevParticipants) => [...prevParticipants, {
                        id: Date.now(), 
                        name: message.value,
                        color: '#f3f3f3'
                    }]);
                    break;
            }
        });
    }, []);

    return (
        <>
            {viewId === 'cohesion-session' && <SessionView />}
            {viewId === 'cohesion-participants' && <ParticipantsView participants={participants} />}
        </>
    )
}

export default App
