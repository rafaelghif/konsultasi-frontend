import { IonContent, IonPage } from "@ionic/react"
import ChatFab from "../components/ChatFab";
import ChatFabPakar from "../components/ChatFabPakar";
import HeaderUser from "../components/HeaderUser";
import { useAppSelector } from "../redux/hook";

const TestMinatBakat: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                {user.role !== 'Pakar' ? <ChatFab /> : <ChatFabPakar />}
            </IonContent>
        </IonPage>
    )
}

export default TestMinatBakat;