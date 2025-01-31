import axios from "axios";
import {addMessage} from "../slices/messagesSlice.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const sendMessage = (messageNew) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:5000/messages", messageNew);
        dispatch(addMessage(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/messages');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);