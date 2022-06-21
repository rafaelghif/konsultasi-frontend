import { IonContent, IonPage } from "@ionic/react"
import ChatFabBox from "../components/ChatBox";
import HeaderUser from "../components/HeaderUser";

const Home: React.FC = () => {
    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                <ChatFabBox />
            </IonContent>
        </IonPage>
    )
}

export default Home;