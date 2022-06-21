import { IonContent, IonPage } from "@ionic/react"
import HeaderAdmin from "../components/HeaderAdmin";

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <HeaderAdmin title="Dashboard" />
            <IonContent>
                Dashboard
            </IonContent>
        </IonPage>
    )
}

export default Dashboard;