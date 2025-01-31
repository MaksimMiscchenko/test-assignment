import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Search.scss';
import {addUserToRoomAsync, getUsersAsync} from '../../store/actions/userActions';


const Search = ({roomId}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const allUsers = useSelector(state => state.user.allUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);

    const filteredUsers = allUsers.filter(user =>
        user.userName.toLowerCase().includes(query.toLowerCase())
    );
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.trim() === '') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleUserClick = (userId) => {
        dispatch(addUserToRoomAsync({roomId, userId}));

        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="search">
            <div className="search__input-wrapper">
                <input
                    className="search__input"
                    type="text"
                    placeholder="Поиск пользователей..."
                    value={query}
                    onChange={handleInputChange}
                />
            </div>
            {isOpen && filteredUsers.length > 0 && (
                <ul className="search__results">
                    {filteredUsers.map(user => (
                        <li
                            key={user.userId}
                            className="search__item"
                            onClick={() => handleUserClick(user.userId)}
                        >
                            {user.userName}
                        </li>
                    ))}
                </ul>
            )}
            {isOpen && filteredUsers.length === 0 && (
                <p className="search__no-results">Пользователи не найдены</p>
            )}
        </div>
    );
};

export default Search;
