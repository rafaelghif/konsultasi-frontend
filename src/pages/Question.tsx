import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios";
import { addOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import HeaderAdmin from "../components/HeaderAdmin"
import { questionWithTypeState } from "../datas/question";
import { questionTypeState } from "../datas/questionType";
import { errorMessage, successMessage } from "../services/toastService";

const Question: React.FC = () => {

    const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);

    const [question, setQuestion] = useState<string>('');
    const [questionTypeId, setQuestionTypeId] = useState<string>('');

    const [questionList, setQuestionList] = useState<questionWithTypeState[]>([]);
    const [questionTypeList, setQuestionTypeList] = useState<questionTypeState[]>([]);

    const columns: TableColumn<questionWithTypeState>[] = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Question',
            selector: row => row.question,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Question Type',
            selector: row => row.QuestionType.questionType,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Question Results',
            selector: row => row.QuestionType.result,
            sortable: true,
            wrap: true,
        },
        {
            name: 'General Indicators',
            selector: row => row.QuestionType.generalIndicator,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Competence',
            selector: row => row.QuestionType.competence,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Role Model',
            selector: row => row.QuestionType.roleModel,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Jobs',
            selector: row => row.QuestionType.jobs,
            sortable: true,
            wrap: true,
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

    const getDataQuestion = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/question`);
            if (response.status === 200) {
                setQuestionList(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const handleBtnAddQuestion = async () => {
        try {
            const responseQuestionType = await axios.get(`${process.env.REACT_APP_HOST}/api/question/questionType`);
            if (responseQuestionType.status === 200) {
                setQuestionTypeList(responseQuestionType.data);
                setIsOpenModalAdd(true);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const handleSubmitFormAddQuestion = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const formData = {
                question: question,
                QuestionTypeId: questionTypeId,
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/question`, formData);
            if (response.status === 200) {
                successMessage("Success Add Question");
                setIsOpenModalAdd(false);
                setQuestion("");
                setQuestionTypeId("");
                getDataQuestion();
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getDataQuestion()
    }, [])

    return (
        <IonPage>
            <HeaderAdmin title="Question" />
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Data Question</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <DataTable columns={columns} data={questionList} pagination striped highlightOnHover />
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonModal isOpen={isOpenModalAdd} onDidDismiss={() => setIsOpenModalAdd(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot='end'>
                                <IonButton onClick={() => setIsOpenModalAdd(false)}>
                                    <IonIcon icon={closeOutline} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>Add Question</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <form onSubmit={handleSubmitFormAddQuestion}>
                            <IonItem>
                                <IonLabel position="stacked">Question</IonLabel>
                                <IonTextarea value={question} onIonChange={e => setQuestion(e.detail.value!)}></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Question Type</IonLabel>
                                <IonSelect value={questionTypeId} onIonChange={e => setQuestionTypeId(e.detail.value!)}>
                                    <IonSelectOption value={""}>Select Question Type</IonSelectOption>
                                    {questionTypeList.length > 0 ? questionTypeList.map((data, index) => (<IonSelectOption key={`question-type-option-${index}`} value={data.id}>{data.questionType}</IonSelectOption>)) : null}
                                </IonSelect>
                            </IonItem>
                            <IonButton type="submit" expand="block">Submit</IonButton>
                        </form>
                    </IonContent>
                </IonModal>
            </IonContent>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton onClick={() => handleBtnAddQuestion()}>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    )
}

export default Question;