import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import HeaderUser from "../components/HeaderUser";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/slice/userSlice";
import { errorMessage, successMessage } from "../services/toastService";

const Login: React.FC = () => {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const history = useHistory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    }

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        try {
            const formData = {
                email: email,
                password: password
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/user/auth`, formData);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser(response.data.response));
                successMessage('Success Login');
                if (response.data.response.role === 'Super User' || response.data.response.role === 'Admin') {
                    history.push('/admin/home');
                } else {
                    history.push('/home');
                }
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
                    <IonCard className="w-1/4 translate-y-1/2">
                        <IonCardHeader>
                            <IonCardTitle>Login</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form method="post" onSubmit={handleSubmit}>
                                <IonItem>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput type="email" onIonChange={e => setEmail(e.detail.value!)} required />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Password</IonLabel>
                                    <IonInput type="password" onIonChange={e => setPassword(e.detail.value!)} onKeyUp={e => handleEnter(e)} required />
                                </IonItem>
                                <IonButton type="submit" className="float-right my-3">Login</IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;