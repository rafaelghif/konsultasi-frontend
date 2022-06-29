import { questionTypeState } from "./questionType";

export interface AnswerUserState {
    id: string;
    createdAt: string;
    updatedAt: string;
    QuestionTypeId: string;
    UserId: string;
    QuestionType: questionTypeState;
}