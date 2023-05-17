import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserStatus } = userSlice.actions;

export default userSlice.reducer;
