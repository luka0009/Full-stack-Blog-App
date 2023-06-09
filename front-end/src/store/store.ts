import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postReducer from './features/post/postSlice';

const userInfoFromStorage = localStorage.getItem("user");
const parsedUserInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const initialState = {
  user: { userInfo: parsedUserInfo }
} 

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
  preloadedState: initialState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
