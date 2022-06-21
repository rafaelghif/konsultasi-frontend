import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

export const store = configureStore({ reducer: reducers, devTools: process.env.NODE_ENV !== 'production' })

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch