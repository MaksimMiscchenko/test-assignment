import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAsync} from '../../store/slices/authSlice.js';
import './Auth.scss';
import {useNavigate} from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {isAuthenticated, error} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUserAsync({username, email}));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/chat');
        }
    }, [isAuthenticated]);


    return (
        <div className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Welcome!</h1>
                <p className="auth__description">Пройдите авторизацию</p>

                <form className="auth__form" onSubmit={handleSubmit}>
                    <input
                        className="auth__input"
                        type="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="auth__input"
                        type="email"
                        placeholder="Почта пользователя"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="auth__btn" type="submit">
                        Вход
                    </button>
                </form>
                {error && <p className="auth__error">{error}</p>}
                {isAuthenticated && <p className="auth__success">Вы успешно авторизованы!</p>}
            </div>
        </div>
    );
};

export default Auth;
