import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {addUserToRoomAsync, getUsersAsync, removeUserFromRoomAsync} from "../actions/userActions.js";

export const getChannelsAsync = createAsyncThunk(
    'user/getChannels',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/rooms');
            return response.data.rooms;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Ошибка при загрузке каналов');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        rooms: [],
        allUsers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChannelsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChannelsAsync.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.rooms = action.payload;
            })
            .addCase(getChannelsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeUserFromRoomAsync.fulfilled, (state, action) => {
                const {roomId, userId} = action.payload;
                const room = state.rooms.find(room => room.roomId === roomId);
                if (room) {
                    room.users = room.users.filter(id => id !== userId);
                }
            })
            .addCase(addUserToRoomAsync.fulfilled, (state, action) => {
                const {roomId, userId} = action.payload;
                const room = state.rooms.find(room => room.roomId === roomId);
                if (room) {
                    room.users.push(userId); // Добавляем пользователя в комнату
                }
            })
    },
});

export default userSlice.reducer;
