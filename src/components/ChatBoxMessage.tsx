import { PakarState } from "../datas/pakar"
import { IonItem, IonTextarea, IonButton } from "@ionic/react";
import { errorMessage } from "../services/toastService";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { ChatMessageState } from "../datas/chat";
import ChatMessage from "./ChatMessage";
import { io, Socket } from "socket.io-client";
import { ChatDetailState } from "../datas/chatDetail";

interface ChatBoxState {
    data: PakarState;
}

const ChatBoxMessage: React.FC<ChatBoxState> = ({ data }) => {

    const user = useAppSelector((state) => state.user);
    const [socket, setSocket] = useState<Socket | null>(null);

    const [message, setMessage] = useState<string>('');
    const [chatMessage, setChatMessage] = useState<ChatMessageState[]>([]);

    const messageBoxRef = useRef<null | HTMLDivElement>(null);

    const getChats = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/chat/getChat/userId/${user.id}/userIdPakar/${data.UserId}`);
            if (response.status === 200) {
                setChatMessage(response.data.ChatDetails.map((data: ChatDetailState) => { return { from: data.from, to: data.to, message: data.message } }));
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scroll({
                behavior: 'smooth',
                top: messageBoxRef.current.scrollHeight,
                left: 0
            })
        }
    }, [chatMessage])

    useEffect(() => {
        if (socket === null) {
            setSocket(io("http://localhost:8081", { autoConnect: false }));
        }

        if (socket) {
            socket.auth = { userId: user.id, roleName: user.role }
            socket.connect();

            socket.on("connect", () => {
                console.log("Connected With Socket Id", socket.id)
            });

            socket.on("Private Message", (data: ChatDetailState) => {
                setChatMessage(old => [...old, data]);
            });
        }
    }, [socket, user.id, user.role]);

    const handleClickSend = () => {
        const formData = {
            from: user.id,
            to: data.UserId,
            message: message
        }

        setChatMessage(old => [...old, formData]);
        setMessage("");

        socket?.emit("private message", formData);
    }

    return (
        <>
            <div ref={messageBoxRef} className="h-[78%] grid-cols-1 overflow-auto p-3 space-y-3 scroll-smooth">
                {chatMessage.map((data, index) => (
                    <ChatMessage key={`chat-message-${index}`} data={{ from: data.from, to: data.to, message: data.message }} />
                ))}
            </div>
            <div className="flex items-center justify-between gap-x-2">
                <IonItem className="px-3 py-2 grow">
                    <IonTextarea value={message} onIonChange={e => setMessage(e.detail.value!)} />
                </IonItem>
                <IonButton className="mr-4" onClick={() => handleClickSend()}>Send</IonButton>
            </div>
        </>
    )
}

export default ChatBoxMessage;