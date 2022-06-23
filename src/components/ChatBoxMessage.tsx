import { PakarState } from "../datas/pakar"
import { IonItem, IonTextarea, IonButton } from "@ionic/react";
import { errorMessage } from "../services/toastService";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { ChatWithDetail } from "../datas/chat";
import ChatMessage from "./ChatMessage";

interface ChatBoxState {
    data: PakarState;
}

const initialState: ChatWithDetail = {
    id: '',
    user1: '',
    user2: '',
    createdAt: '',
    updatedAt: '',
    ChatDetails: []
}

const ChatBoxMessage: React.FC<ChatBoxState> = ({ data }) => {

    const user = useAppSelector((state) => state.user);

    const [chatMessage, setChatMessage] = useState<ChatWithDetail>(initialState);

    const getChats = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/chat/getChat/userId/${user.id}/userIdPakar/${data.UserId}`);
            if (response.status === 200) {
                setChatMessage(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="h-[78%] grid-cols-1 overflow-auto p-3 space-y-3">
                {chatMessage.ChatDetails.map((data, index) => (
                    <ChatMessage key={`chat-message-${index}`} data={data} />
                ))}
            </div>
            <div className="flex items-center justify-between gap-x-2">
                <IonItem className="px-3 py-2 grow">
                    <IonTextarea></IonTextarea>
                </IonItem>
                <IonButton className="mr-4">Send</IonButton>
            </div>
        </>
    )
}

export default ChatBoxMessage;