import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserAsync = createAsyncThunk(
    'auth/loginUser',
    async ({username, email}, {rejectWithValue}) => {
        try {
            const response = await axios.get('https://hr2.sibers.com/test/frontend/users.json');
            const users = response.data;

            const user = users.find(
                (user) => user.username === username && user.email === email
            );
            if (user) {
                return user;
            } else {
                return rejectWithValue('Неверное имя пользователя или почта');
            }
        } catch (error) {
            return rejectWithValue('Ошибка при подключении к серверу');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        error: '',
        loading: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = '';
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const {logoutUser} = authSlice.actions;

export default authSlice.reducer;
