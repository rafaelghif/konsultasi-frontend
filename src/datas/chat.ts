import { ChatDetailState } from "./chatDetail";

export interface ChatState {
    id: string;
    user1: string;
    user2: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChatWithDetail {
    id: string;
    user1: string;
    user2: string;
    createdAt: string;
    updatedAt: string;
    ChatDetails: ChatDetailState[]
}