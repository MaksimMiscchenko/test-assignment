import {useEffect} from 'react';
import './Channels.scss';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getChannelsAsync} from "../../store/actions/userActions.js";
import {useNavigate} from 'react-router-dom';


const Channels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const rooms = useSelector(state => state.user.rooms);
    const loading = useSelector(state => state.user.loading);

    useEffect(() => {
        if (user?.id === 0) {
            dispatch(getChannelsAsync());
        }
    }, [user?.id, dispatch]);

    const userRooms = Array.isArray(rooms)
        ? rooms.filter(room =>
            Array.isArray(room.users) && room.users.includes(String(user?.id))
        )
        : [];

    const handleRoomClick = (room) => {
        navigate(`/room/${room.roomId}`);
    };

    return (
        <div className="channels">
            <h3>Чаты</h3>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul className="channels__list">
                    {userRooms?.length > 0 ? (
                        userRooms.map((room) => (
                            <li
                                className={classNames('channels__link')}
                                key={room.roomId}
                                onClick={() => handleRoomClick(room)}
                            >
                                {room.roomName}
                            </li>
                        ))
                    ) : (
                        <p>Вы не состоите ни в одной комнате</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Channels;
