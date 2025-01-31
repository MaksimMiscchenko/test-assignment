import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './UserList.scss';
import {useDispatch, useSelector} from 'react-redux';
import RemoveButton from '../Shared/RemoveButton.jsx';
import {getUsersAsync, removeUserFromRoomAsync} from '../../store/actions/userActions.js';

const UserList = ({title}) => {
    const params = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const rooms = useSelector(state => state.user.rooms);
    const loading = useSelector(state => state.user.loading);
    const allUsers = useSelector(state => state.user.allUsers);

    const room = rooms.find(room => room.roomId === params.id);
    const isAdmin = room?.adminId === user?.id;

    const userIds = room ? room.users : [];

    const users = userIds
        .map(id => allUsers.find(user => user.userId == id))
        .filter(user => user !== undefined);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);

    const handleRemoveUser = (userId) => {
        dispatch(removeUserFromRoomAsync({roomId: params.id, userId}));
    };
    return (
        <div className="users">
            <h3 className="users__title">{title}</h3>

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul className="users__list">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div key={user.userId} className="users__link">
                                <li className="users__name">
                                    {user.userName}
                                </li>
                                {isAdmin && (
                                    <RemoveButton onClick={() => handleRemoveUser(user.userId)}/>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Пользователи отсутствуют</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default UserList;
