import React, {useEffect} from 'react';
import {useSelector,} from 'react-redux';
import Channels from "../../Components/Chennels/Channels.jsx";
import './Chat.scss';
import {useNavigate} from "react-router";
import CreateChannel from "../../Components/Chennels/CreateChannel.jsx";

const Chat = () => {
    const username = useSelector((state) => state.auth.user?.username);
    const navigate = useNavigate();

    const AuthVerification = (username) => {
        if (username === undefined) {
            navigate('/')
        }
    }
    useEffect(() => {
        AuthVerification(username);
    }, [username]);

    return (
        <div className='main'>
            <div className='main__sidebar'>
                <CreateChannel/>
                <Channels/>
            </div>
            <div className='main__info'>
                <h1 className='main__title'>Добро пожаловать</h1>
                <p className='main__text'>Выберете канал или пользователь , что бы начать чат.</p>
            </div>
        </div>
    );
};

export default Chat;
