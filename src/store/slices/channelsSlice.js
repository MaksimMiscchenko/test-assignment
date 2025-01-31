import {createSlice} from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        rooms: [],
    },
    reducers: {
        addChannel: (state, action) => {
            state.rooms.push(action.payload);
        },
    },
});

export const {addChannel} = channelsSlice.actions;
export default channelsSlice.reducer;
