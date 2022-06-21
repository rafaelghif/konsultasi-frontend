import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../datas/user';

const initialState: UserState = {
    id: '',
    email: '',
    password: '',
    name: '',
    role: '',
    createdAt: '',
    updatedAt: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload
        },
        clearUser: () => {
            return initialState;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer