import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonText } from "@ionic/react"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChatFab from "../components/ChatFab";
import ChatFabPakar from "../components/ChatFabPakar";
import HeaderUser from "../components/HeaderUser";
import { AnswerUserState } from "../datas/answerUser";
import { questionWithTypeState } from "../datas/question";
import { useAppSelector } from "../redux/hook";
import { errorMessage, successMessage } from "../services/toastService";

interface QuestionSelectState {
    id: string;
    value: number;
    QuestionTypeId: string;
}

const TestMinatBakat: React.FC = () => {
    const user = useAppSelector((state) => state.user);

    const [answerUserList, setAnswerUserList] = useState<AnswerUserState[]>([]);
    const [questionList, setQuestionList] = useState<questionWithTypeState[]>([]);

    const [selectedQuestion, setSelectedQuestion] = useState<QuestionSelectState[]>([]);

    const history = useHistory();

    useEffect(() => {
        if (user.id === "") {
            history.push("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getQuestionList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/question/user`)
            if (response.status === 200) {
                setQuestionList(response.data)
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const getDataAnswerUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/question/alreadyAnswer/UserId/${user.id}`);
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setAnswerUserList(response.data);
                    setQuestionList([]);
                } else {
                    getQuestionList();
                }
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        if (user.id !== '') {
            getDataAnswerUser();
        } else {
            setAnswerUserList([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id])

    const handleChangeRadio = (data: QuestionSelectState) => {
        const dataIndex = selectedQuestion.findIndex(e => e.id === data.id)
        if (dataIndex === -1) {
            setSelectedQuestion(old => [...old, data]);
        } else {
            setSelectedQuestion(selectedQuestion.map((dataSelected, index) => index !== dataIndex ? dataSelected : { id: data.id, value: data.value, QuestionTypeId: data.QuestionTypeId }))
        }
    }

    const handleFormSubmitQuestion = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (questionList.length !== selectedQuestion.length) return errorMessage('Please select all item!');

            const formData = {
                data: selectedQuestion,
                UserId: user.id
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/question/answer`, formData);

            if (response.status === 200) {
                successMessage("Success Answer Question!");
                await getDataAnswerUser();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                {answerUserList.length === 0 ? (
                    <form onSubmit={handleFormSubmitQuestion} className="md:px-14 py-2">
                        <IonGrid>
                            <IonRow>
                                {
                                    questionList.length > 0 ? questionList.map((data, index) => (
                                        <IonCol size="12" key={`question-list-${index}`}>
                                            <IonCard>
                                                <IonCardHeader>
                                                    <IonCardTitle>{index + 1}. {data.question}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonRadioGroup onIonChange={e => handleChangeRadio({ id: data.id, value: e.detail.value, QuestionTypeId: data.QuestionTypeId })}>
                                                    <IonItem>
                                                        <IonLabel>Ya</IonLabel>
                                                        <IonRadio value={1}></IonRadio>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Tidak</IonLabel>
                                                        <IonRadio value={0}></IonRadio>
                                                    </IonItem>
                                                </IonRadioGroup>
                                            </IonCard>
                                        </IonCol>
                                    )) : null
                                }
                                <IonCol size="12" className="flex justify-center">
                                    <IonButton type="submit">Submit</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                ) : (
                    <IonGrid>
                        <IonRow>
                            {answerUserList.map((data, index) => (
                                <IonCol size="12" key={`data-answerUser-${index}`}>
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>{data.QuestionType.result}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent className="flex flex-col gap-1">
                                            <div>
                                                <span className="font-semibold">Kompetensi :</span>
                                                <p>{data.QuestionType.competence}</p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Indikator umum :</span>
                                                <p>{data.QuestionType.generalIndicator}</p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Tokoh panutan :</span>
                                                <p>{data.QuestionType.roleModel}</p>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Pilihan Karier :</span>
                                                <p>{data.QuestionType.jobs}</p>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}

                {user.role !== 'Pakar' ? <ChatFab /> : <ChatFabPakar />}
            </IonContent>
        </IonPage>
    )
}

export default TestMinatBakat;