import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        channels: channelsReducer,
        messages: messagesReducer,
    },
});

export default store;
