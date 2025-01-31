import {createSlice} from '@reduxjs/toolkit';

import {getMessages} from "../actions/messagesActions.js";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export const {addMessage,} = messagesSlice.actions;
export default messagesSlice.reducer;
