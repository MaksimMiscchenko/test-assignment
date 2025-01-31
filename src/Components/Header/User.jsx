import React from 'react';
import {useSelector} from "react-redux";
import Avatar from '../../assets/free-icon-user-1946392.png'
import './User.scss'


const User = () => {
    const username = useSelector((state) => state.auth.user?.username);
    return (
        <div className="profile">
            <img src={Avatar} alt="prof" className="profile__img"/>
            <p className='profile__name'>{username}</p>
        </div>
    );
};

export default User;