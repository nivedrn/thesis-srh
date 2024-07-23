import { DefaultEventsMap } from '@socket.io/component-emitter';
import './assets/css/App.css'
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { vscode } from './utilities/vscode';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function App() {
    const count = 555;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Initialized View");
        vscode.postMessage({
            command: "ready",
            text: "Yo Yo Yoooo"
        });
    }, []);

    const initializeSocketConnection = async (sessionId: string) => {
        try{

            socket = io("http://localhost:5000", {
                transports: ["websocket"],
            });
    
            socket.emit("join-room", sessionId, () => {
                console.log("Messenger joined room.");
                vscode.postMessage({
                    command: "onInfo",
                    text: "Attempting to create socket room @ " + sessionId
                });
            });
    
            console.log("Joined Room: ", socket);
        }catch(err){
            console.log(err);
        }
        setIsLoading(false);
    };

    if (socket != undefined) {
        socket.on("connect", () => {
            console.log(`${socket.id}`);
        });

        socket.on("feedback", (message: string) => {
            console.log(message);
        });
    }

    const createSession = async () => {
        setIsLoading(true);
        const sessionId: string = nanoid();
        console.log(sessionId);
        vscode.postMessage({
            command: "ready",
            text: "Attempting to create socket room @ " + sessionId
        });
        initializeSocketConnection(sessionId);
    };

    if (socket != undefined) {
        socket.on("connect", () => {
            console.log(`${socket.id}`);
        });
    }

    return (
        <>
            <div>
                <a href="#">Test</a>Hello {count} {isLoading}
                <VSCodeButton onClick={createSession}>Start Session</VSCodeButton>
            </div>
        </>
    )
}

export default App
