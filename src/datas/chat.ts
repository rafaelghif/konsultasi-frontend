import { ChatDetailState } from "./chatDetail";
import { UserState } from "./user";

export interface ChatState {
    id: string;
    user1: string;
    user2: string;
    socketIdUser1: string;
    socketIdUser2: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChatWithDetail {
    id: string;
    user1: string;
    user2: string;
    socketIdUser1: string;
    socketIdUser2: string;
    createdAt: string;
    updatedAt: string;
    ChatDetails: ChatDetailState[]
}

export interface ChatWithUsers {
    id: string;
    user1: string;
    user2: string;
    socketIdUser1: string;
    socketIdUser2: string;
    createdAt: string;
    updatedAt: string;
    UserId: UserState;
}

export interface ChatMessageState {
    from: string;
    to: string;
    message: string;
}