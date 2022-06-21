import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react"
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import HeaderUser from "../components/HeaderUser"
import { errorMessage, successMessage, warningMessage } from "../services/toastService";

const Register: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const history = useHistory();

    const handleSubmitFormRegister = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (password !== repeatPassword) return warningMessage('Password and Repeat Password Not Match');

            const formData = {
                email: email,
                password: password,
                name: name,
                role: 'User'
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/user/register`, formData)
            if (response.status === 200) {
                successMessage(`Success Add User ${response.data.id}`);
                history.push('/testminatbakat');
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                <div className="flex items-center justify-center w-full">
                    <IonCard class="w-1/3 translate-y-1/2">
                        <IonCardHeader>
                            <IonCardTitle>Daftar Akun</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form onSubmit={handleSubmitFormRegister}>
                                <IonItem>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Password</IonLabel>
                                    <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Repeat Password</IonLabel>
                                    <IonInput type="password" value={repeatPassword} onIonChange={e => setRepeatPassword(e.detail.value!)} required />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Name</IonLabel>
                                    <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)} required />
                                </IonItem>
                                <IonButton type="submit" expand="block">Daftar</IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Register;