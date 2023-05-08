import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    },
    logOut: (state) => {
        state.userInfo = null;
    }
  },
})

export const { setUserInfo, logOut } = userSlice.actions


export default userSlice.reducer