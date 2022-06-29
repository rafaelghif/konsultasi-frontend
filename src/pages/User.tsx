import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios";
import { addOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin"
import { errorMessage, successMessage, warningMessage } from "../services/toastService";
import DataTable, { TableColumn } from 'react-data-table-component';
import { UserState } from "../datas/user";

const User: React.FC = () => {

    const [userList, setUserList] = useState<UserState[]>([]);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('Pakar');

    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/user`);
            if (response.status === 200) {
                setUserList(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const columns: TableColumn<UserState>[] = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Created At',
            selector: row => row.createdAt
        },
        // {
        //     name: 'Action',
        //     cell: (row) => (<>
        //         <IonButton color={"warning"}>Edit</IonButton>
        //         <IonButton color={"danger"}>Delete</IonButton>
        //     </>),
        //     center: true
        // }
    ];

    const handleSubmitFormAddUser = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (password !== repeatPassword) return warningMessage('Password and Repeat Password Not Match');

            const formData = {
                email: email,
                password: password,
                name: name,
                role: role
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/user`, formData)
            if (response.status === 200) {
                successMessage(`Success Add User ${response.data.id}`);
                getUsers();
                setIsOpenModalAdd(false);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <IonPage>
            <HeaderAdmin title="User" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Data Users</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <DataTable columns={columns} data={userList} pagination striped highlightOnHover />
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonFab vertical="bottom" horizontal="end">
                    <IonFabButton onClick={() => setIsOpenModalAdd(true)}>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
                <IonModal isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot='end'>
                                <IonButton onClick={() => setIsOpenModalAdd(false)}>
                                    <IonIcon icon={closeOutline} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>Add User</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <form onSubmit={handleSubmitFormAddUser}>
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
                            <IonItem>
                                <IonLabel position="stacked">Role</IonLabel>
                                <IonSelect value={role} onIonChange={e => setRole(e.detail.value!)}>
                                    <IonSelectOption value={"Super User"}>Super User</IonSelectOption>
                                    <IonSelectOption value={"Admin"}>Admin</IonSelectOption>
                                    <IonSelectOption value={"Pakar"}>Pakar</IonSelectOption>
                                    <IonSelectOption value={"User"}>User</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonButton type="submit" expand="block">Submit</IonButton>
                        </form>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default User;