import { createSlice, createAction } from '@reduxjs/toolkit';

import { postRegistration, postLogin } from 'api/auth';
import { set, get, remove } from 'utils/localstore'
import axios, { setAuthHeader, removeAuthHeader } from 'api/config';

export const login = createAction('auth/login')
export const logout = createAction('auth/logout')

const token = get('token') || null;
if (token) 
    setAuthHeader(axios, token)

// Reducer
export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: !!token,
        token: token,
        error: false,
        pending: false
    },
    reducers: {
        login(state, action) {
            state.isAuth = true;
            set('token', state.token)
            setAuthHeader(axios, token)
        },
        logout(state) {
            state.isAuth = false;
            remove('token')
            removeAuthHeader(axios)
        }
    },
    extraReducers: {

        // Register User
        [postRegistration.pending]: (state, action) => {
            state.pending = true
        },
        [postRegistration.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.token = action.payload.accessToken;
            state.isAuth = false;
            state.newly_registered = true;
            set('token', state.token)
            setAuthHeader(axios, state.token)
        },
        [postRegistration.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload.response.data || action.error
            removeAuthHeader(axios)
        },

        // Login User
        [postLogin.pending]: (state, action) => {
            state.pending = true
        },
        [postLogin.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.token = action.payload.accessToken;
            state.isAuth = true
            set('token', state.token)
            setAuthHeader(axios, state.token)
        },
        [postLogin.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload.response.data || action.error
            removeAuthHeader(axios)
        },
        
    }
});

// Selectors
export const getAuth = state => state.auth;
export const getIsAuth = state => state.auth.isAuth;

export const getAuthError = state => state.auth.error;
export const isNewlyRegistered = state => state.auth.newly_registered;

export default slice.reducer;
  