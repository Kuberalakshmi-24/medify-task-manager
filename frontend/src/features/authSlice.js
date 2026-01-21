import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: localStorage.getItem('token'), 
    user: null 
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;