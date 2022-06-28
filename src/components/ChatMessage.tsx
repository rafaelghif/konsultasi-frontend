import { IonImg } from "@ionic/react";
import { useAppSelector } from "../redux/hook";
import profilePicture from '../assets/images/profile.png';

interface PrivateMessageState {
    from: string;
    to: string;
    message: string;
}

interface ChatMessageState {
    data: PrivateMessageState
}

const ChatMessage: React.FC<ChatMessageState> = ({ data }) => {
    const user = useAppSelector((state) => state.user);
    return (
        <div className={user.id === data.from ? "flex justify-end  space-x-8" : "flex justify-start space-x-8"}>
            {user.id === data.from ? (
                <>
                    <div className="max-w-md px-5 py-2 bg-white shadow-xl rounded-xl">
                        {data.message}
                    </div>
                    <IonImg src={profilePicture} alt="Profile Picture" className="w-8" />
                </>

            ) : (
                <>
                    <IonImg src={profilePicture} alt="Profile Picture" className="w-8" />
                    <div className="max-w-md px-5 py-2 bg-white shadow-xl rounded-xl" >
                        {data.message}
                    </div>
                </>
            )}
        </div>
    )
}
export default ChatMessage;