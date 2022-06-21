import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react"
import { menuOutline } from "ionicons/icons";

interface HeaderAdminState {
    title: string
}

const HeaderAdmin: React.FC<HeaderAdminState> = ({ title }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonMenuToggle menu="side-menu">
                        <IonButton>
                            <IonIcon icon={menuOutline} />
                        </IonButton>
                    </IonMenuToggle>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderAdmin;