import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getChannelsAsync = createAsyncThunk(
    'user/getChannels',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/rooms')
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка при подключении к серверу');

        }
    }
);
export const getUsersAsync = createAsyncThunk(
    'user/getUsers',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Ошибка при загрузке пользователей');
        }
    }
);

export const removeUserFromRoomAsync = createAsyncThunk(
    'user/removeUserFromRoom',
    async ({roomId, userId}, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/rooms');
            let rooms = response.data;
            const room = rooms.find(room => room.roomId === roomId);
            if (!room) {
                return rejectWithValue('Комната не найдена');
            }
            const updatedUsers = room.users.filter(id => id !== userId);
            await axios.patch(`http://localhost:5000/rooms/${room.id}`, {users: updatedUsers});
            return {roomId, userId};
        } catch (error) {
            console.log('Ошибка удаления пользователя:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const addUserToRoomAsync = createAsyncThunk(
    'user/addUserToRoom',
    async ({roomId, userId}, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/rooms');
            let rooms = response.data;
            const room = rooms.find(room => room.roomId === roomId);
            const updatedUsers = [...room.users, userId];
            await axios.patch(`http://localhost:5000/rooms/${room.id}`, {users: updatedUsers});
            return {roomId, userId};
        } catch (error) {
            console.log('Ошибка:', error);
            return rejectWithValue(error.message);
        }
    }
);