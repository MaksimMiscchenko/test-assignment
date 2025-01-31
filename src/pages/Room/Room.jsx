import React from 'react';
import {useParams} from "react-router-dom";
import UserList from "../../Components/UserList/UserList.jsx";
import MessageArea from "../../Components/Message/MessageArea.jsx";
import './Room.scss'
import Header from "../../Components/Header/Header.jsx";

const Room = () => {
    const params = useParams();
    return (
        <>
            <Header roomId={params.id}/>
            <div className='room'>
                <UserList title={"Участники"}/>
                <MessageArea/>
            </div>
        </>
    );
};

export default Room;