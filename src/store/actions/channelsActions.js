import axios from 'axios';
import {addChannel} from '../slices/channelsSlice.js';

export const createChannelAsync = (channelData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/rooms', channelData);
        dispatch(addChannel(response.data));
    } catch (error) {
        console.error('Ошибка при создании канала:', error);
    }
};
