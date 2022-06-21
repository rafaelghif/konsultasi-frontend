import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';

const reducers = combineReducers({
    user: userSlice
})

export default reducers;