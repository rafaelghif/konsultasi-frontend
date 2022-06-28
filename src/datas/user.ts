export interface UserState {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    socketId: string;
    createdAt: string;
    updatedAt: string;
}

export const initialUserState = {
    id: '',
    name: '',
    email: '',
    password: '',
    createdAt: '',
    role: '',
    socketId: '',
    updatedAt: ''
}