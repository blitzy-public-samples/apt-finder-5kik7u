import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from 'frontend/src/schema/user';

interface UserState {
  currentUser: UserSchema | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// HUMAN ASSISTANCE NEEDED
// The confidence level for the userSlice function is below 0.8. 
// Please review and adjust the implementation as needed.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserSchema>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = userSlice.actions;

export default userSlice.reducer;