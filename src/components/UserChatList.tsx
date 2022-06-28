import { IonAvatar, IonImg, IonItem, IonLabel } from "@ionic/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChatWithUsers } from "../datas/chat";
import { useAppSelector } from "../redux/hook";
import { errorMessage } from "../services/toastService";
import profilePicture from '../assets/images/profile.png';
import { initialUserState } from "../datas/user";

interface UserChatListState {
    onClickItem: (userId: string) => void,
    selectedUser: string;
}

const initialUser: ChatWithUsers[] = [{
    id: '',
    user1: '',
    user2: '',
    socketIdUser1: '',
    socketIdUser2: '',
    createdAt: '',
    updatedAt: '',
    UserId: initialUserState
}]

const UserChatList: React.FC<UserChatListState> = ({ onClickItem, selectedUser }) => {

    const user = useAppSelector((state) => state.user);

    const [userList, setUserList] = useState<ChatWithUsers[]>(initialUser);

    const getUserLists = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/chat/getUserList/userId/${user.id}`)
            if (response.status === 200) {
                setUserList(response.data)
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getUserLists()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {
                userList.length > 0 ? (
                    userList.map((data, index) => (
                        <IonItem button lines="full" color={selectedUser === data.UserId.id ? "primary" : "light"} key={`user-chat-${index}`} onClick={() => onClickItem(data.UserId.id)} className="my-1">
                            <IonAvatar slot="start">
                                <IonImg src={profilePicture} alt="Profile Picture" />
                            </IonAvatar>
                            <IonLabel>{data.UserId.name}</IonLabel>
                        </IonItem>
                    ))
                ) : null
            }
        </div>
    )
}

export default UserChatList;