import { IonContent, IonPage } from "@ionic/react"
import ChatFab from "../components/ChatFab";
import HeaderUser from "../components/HeaderUser";

const Home: React.FC = () => {
    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                <ChatFab />
            </IonContent>
        </IonPage>
    )
}

export default Home;