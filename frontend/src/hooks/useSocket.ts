import { useEffect, useState } from "react"

export const useSocket = () =>{
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const socketURL = import.meta.env.VITE_APP_WS_URL ?? "ws://localhost:8080";

    useEffect(()=>{

        const ws = new WebSocket(socketURL);

        ws.onopen = () =>{
            console.log("connected");
            
            setSocket(ws);
        }

        ws.onclose = () =>{
            console.log("disconnected");

            setSocket(null);
            
        }

        return () =>{
            ws.close();
        }


    },[])

    return socket
}