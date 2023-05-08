import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

interface UserState {
  userInfo: any
}

const initialState: UserState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
    }
  },
})

export const { setUserInfo } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.userInfo;

export default userSlice.reducer