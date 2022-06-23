import { IonFab, IonFabButton, IonIcon, IonFabList, IonLabel, IonModal, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent } from "@ionic/react"
import axios from "axios";
import { chatboxOutline, closeOutline, personOutline } from "ionicons/icons"
import { useEffect, useState } from "react";
import { PakarState } from "../datas/pakar";
import { useAppSelector } from "../redux/hook";
import { errorMessage } from "../services/toastService";
import ChatBoxMessage from "./ChatBoxMessage";

const initialState: PakarState = {
    id: '',
    name: '',
    title: '',
    description: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    UserId: ''
}

const ChatFab: React.FC = () => {

    const user = useAppSelector((state) => state.user);

    const [pakarList, setPakarList] = useState<PakarState[]>([]);

    const [isOpenModalChat, setIsOpenModalChat] = useState<boolean>(false);
    const [selectedPakar, setSelectedPakar] = useState<PakarState>(initialState);

    const getPakars = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/pakar`);
            if (response.status === 200) {
                setPakarList(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getPakars()
    }, []);

    const handleClickFab = (data: PakarState) => {
        if (user.id === "") return errorMessage('Please refresh page and login');
        setSelectedPakar(data);
        setIsOpenModalChat(true);
    }

    return (
        <>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton>
                    <IonIcon icon={chatboxOutline} />
                </IonFabButton>
                <IonFabList side="top">
                    {pakarList.map((data, index) => (
                        <div key={`fab-button-key-${index}`} className="relative my-2" onClick={() => handleClickFab(data)}>
                            <IonLabel className={data.name.split(" ").length < 3 ? "absolute w-32 px-3 py-2 text-sm bg-white rounded-md shadow-xl right-16 top-3" : "absolute w-48 px-3 py-2 text-sm bg-white rounded-md shadow-md right-16 top-3"}>{data.name}</IonLabel>
                            <IonFabButton color={"warning"}>
                                <IonIcon icon={personOutline} />
                            </IonFabButton>
                        </div>
                    ))}
                </IonFabList>
            </IonFab>
            <IonModal isOpen={isOpenModalChat} onDidDismiss={() => setIsOpenModalChat(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='end'>
                            <IonButton onClick={() => setIsOpenModalChat(false)}>
                                <IonIcon icon={closeOutline} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Chat with {selectedPakar?.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <ChatBoxMessage data={selectedPakar} />
                </IonContent>
            </IonModal>
        </>
    )
}

export default ChatFab