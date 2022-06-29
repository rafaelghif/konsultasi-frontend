import { questionTypeState } from "./questionType";

export interface questionState {
    id: string;
    question: string;
    createdAt: string;
    updatedAt: string;
    QuestionTypeId: string;
}

export interface questionWithTypeState {
    id: string;
    question: string;
    createdAt: string;
    updatedAt: string;
    QuestionTypeId: string;
    QuestionType: questionTypeState;
}