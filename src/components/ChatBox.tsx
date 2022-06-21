import { IonFab, IonFabButton, IonIcon, IonFabList, IonLabel, IonModal, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonTextarea, IonImg } from "@ionic/react"
import axios from "axios";
import { chatboxOutline, closeOutline, personOutline } from "ionicons/icons"
import { useEffect, useState } from "react";
import { PakarState } from "../datas/pakar";
import { useAppSelector } from "../redux/hook";
import { errorMessage } from "../services/toastService";
import profilePicture from '../assets/images/profile.png';

const ChatFabBox: React.FC = () => {

    const user = useAppSelector((state) => state.user);

    const [pakarList, setPakarList] = useState<PakarState[]>([]);

    const [isOpenModalChat, setIsOpenModalChat] = useState<boolean>(false);
    const [selectedPakar, setSelectedPakar] = useState<PakarState>();

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
                    <div className="h-[78%] overflow-auto p-3 space-y-3">
                        <div className="flex space-x-8">
                            <IonImg src={profilePicture} alt="Profile Picture" className="w-8" />
                            <div className="max-w-md px-5 py-2 bg-white shadow-xl rounded-xl">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                        <div className="flex float-right space-x-8">
                            <div className="max-w-md px-5 py-2 bg-white shadow-xl rounded-xl">
                                Ok
                            </div>
                            <IonImg src={profilePicture} alt="Profile Picture" className="w-8" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                        <IonItem className="px-3 py-2 grow">
                            <IonTextarea></IonTextarea>
                        </IonItem>
                        <IonButton className="mr-4">Send</IonButton>
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}

export default ChatFabBox