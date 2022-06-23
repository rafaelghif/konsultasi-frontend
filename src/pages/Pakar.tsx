import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios";
import { addOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import HeaderAdmin from "../components/HeaderAdmin"
import { PakarState } from "../datas/pakar";
import { errorMessage, successMessage } from "../services/toastService";

const Pakar: React.FC = () => {

    const [pakarList, setPakarList] = useState<PakarState[]>([]);

    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);

    const getPakars = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/pakar`)
            if (response.status === 200) {
                setPakarList(response.data)
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const columns: TableColumn<PakarState>[] = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            grow: 3,
            wrap: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            grow: 3,
            wrap: true
        },
        {
            name: 'Created At',
            selector: row => row.createdAt
        },
        {
            name: 'Action',
            cell: (row) => (<>
                <IonButton color={"warning"}>Edit</IonButton>
                <IonButton color={"danger"}>Delete</IonButton>
            </>),
            center: true
        }
    ];

    const handleSubmitFormAddPakar = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const formData = {
                name: name,
                title: title,
                description: description,
                email: email,
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/pakar`, formData);
            if (response.status === 200) {
                successMessage(`Success Add Pakar ${response.data.id}`);
                getPakars();
                setIsOpenModalAdd(false);
            }
        } catch (err) {
            errorMessage(err)
        }
    }

    useEffect(() => {
        getPakars()
    }, [])

    return (
        <IonPage>
            <HeaderAdmin title="Pakar" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Data Pakar</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <DataTable columns={columns} data={pakarList} pagination striped highlightOnHover />
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
                            <IonTitle>Add Pakar</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <form onSubmit={handleSubmitFormAddPakar}>
                            <IonItem>
                                <IonLabel position="stacked">Name</IonLabel>
                                <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Title</IonLabel>
                                <IonInput type="text" value={title} onIonChange={e => setTitle(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Description</IonLabel>
                                <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} required></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
                            </IonItem>
                            <IonButton type="submit" expand="block">Submit</IonButton>
                        </form>
                    </IonContent>
                </IonModal>
            </IonContent>

        </IonPage>
    )
}

export default Pakar;