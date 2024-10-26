import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from "socket.io-client";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { vscode } from '../utilities/vscode';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const SessionView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sessionUrl, setSessionUrl] = useState('');
    const [isSessionActive, setIsSessionActive] = useState<boolean>(false);


    const initializeSocketConnection = async (sessionId: string) => {
        try {

            socket = io("http://localhost:5000", {
                transports: ["websocket"],
            });

            window.addEventListener('message', event => {

                const message = event.data;
                console.log(message);

                switch (message.type) {
                    case 'updatedWorkspaceTree':
                        socket.emit("update-workspace", sessionId, message, () => {
                            console.log("Initial Workspace Emitted");
                        });
                        break;
                }
            });

            socket.emit("join-room", sessionId, () => {
                console.log("Messenger joined room.");

                vscode.postMessage({
                    type: "startSession",
                    value: "Attempting to create socket room @ " + sessionId
                });

                console.log("Joined Room: ", sessionId);
                setIsSessionActive(true);
            });

        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const createSession = async () => {
        setIsLoading(true);
        const sessionId: string = nanoid();
        setSessionUrl(`http://localhost:5000/session/${sessionId}`);
        console.log(sessionId);
        initializeSocketConnection(sessionId);
        vscode.postMessage({
            type: "getWorkspaceTree",
            value: true
        });
    };

    
    const endSession = async () => {
        setIsLoading(true);
        setSessionUrl('');
        vscode.postMessage({
            type: "getWorkspaceTree",
            value: true
        });
        setIsLoading(false);
    };

    if (socket != undefined) {
        socket.on("connect", () => {
            console.log(`${socket.id}`);
        });

        socket.on("updateParticipants", (participantsList) => {
            console.log(`${socket.id}`);
            vscode.postMessage({
                type: "updateParticipants",
                value: participantsList
            });
        });
    }

    return (
        <>
            {isSessionActive ? (
                <>
                    <div>
                        <p>Share the below link to invite people to collab: {sessionUrl}</p>                        
                        <p>Click the below button to end the session.</p>
                        <button onClick={endSession}>End session</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        {isLoading}
                        <p>Click the below button to create a new collab session.</p>
                        <button onClick={createSession}>Host a session</button>
                    </div>
                    <div>
                        <textarea id="story" name="story" rows={5}>
                            {sessionUrl}    
                        </textarea>
                    </div>
                </>
            )}

        </>
    )
}

export default SessionView