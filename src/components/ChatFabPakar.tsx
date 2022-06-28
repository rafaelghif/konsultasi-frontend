import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { chatboxOutline, closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import ChatBoxMessagePakar from "./ChatBoxMessagePakar";
import UserChatList from "./UserChatList";

const ChatFabPakar: React.FC = () => {

    const [isOpenModalChat, setIsOpenModalChat] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<string>('');

    const handleClickChat = () => {
        setIsOpenModalChat(true);
    }

    const handleClickItem = (userId: string) => {
        setSelectedUser(userId);
    }

    return (
        <>
            <IonFab vertical="bottom" horizontal="end" onClick={() => handleClickChat()}>
                <IonFabButton>
                    <IonIcon icon={chatboxOutline} />
                </IonFabButton>
            </IonFab>
            <IonModal isOpen={isOpenModalChat} onDidDismiss={() => setIsOpenModalChat(false)} className="modal-md">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='end'>
                            <IonButton onClick={() => setIsOpenModalChat(false)}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Chat</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeMd="4" className="pr-2 h-[200px] overflow-auto md:h-auto">
                                <UserChatList onClickItem={(e) => handleClickItem(e)} selectedUser={selectedUser} />
                            </IonCol>
                            <IonCol>
                                {selectedUser !== '' ? <ChatBoxMessagePakar selectedUser={selectedUser} /> : null}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </>
    )
}
export default ChatFabPakar;