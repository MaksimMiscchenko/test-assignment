import {useState} from 'react';
import './CreateChennel.scss';
import {useDispatch, useSelector} from 'react-redux';
import {createChannelAsync} from '../../store/actions/channelsActions';
import {getChannelsAsync} from "../../store/actions/userActions.js";

const CreateChannel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState(''); // Состояние для ошибки
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const generateRoomId = () => {
        const time = Date.now().toString(36);
        return `${time}`;
    };

    const handleCreateChannel = async () => {
        if (!roomName.trim()) {
            setError('Название чата не может быть пустым!');
            return;
        }

        const roomId = generateRoomId();
        const newUser = user.id
        await dispatch(
            createChannelAsync({
                roomId,
                roomName: roomName.trim(),
                adminName: user.username,
                adminId: user.id,
                users: [newUser.toString()],
            })
        );
       await dispatch(getChannelsAsync())
        setRoomName('');
        setIsModalOpen(false);
        setError('');
    };

    const handleCloseModal = () => {
        setRoomName('');
        setError('');
        setIsModalOpen(false);
    };

    return (
        <div className="create-channel">
            {!isModalOpen ? (
                <button
                    className="create-channel__button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Создать чат
                </button>
            ) : (
                <div className="create-channel__modal">
                    <div className="create-channel__modal-content">
                        <h3 className="create-channel__modal-title">Создать чат</h3>
                        <input
                            type="text"
                            className="create-channel__input"
                            placeholder="Название чата"
                            value={roomName}
                            onChange={(e) => {
                                setRoomName(e.target.value);
                                setError('');
                            }}
                        />
                        {error && <p className="create-channel__error">{error}</p>}
                        <div className="create-channel__modal-buttons">
                            <button
                                className="create-channel__modal-button create-channel__modal-button--create"
                                onClick={handleCreateChannel}
                            >
                                Создать
                            </button>
                            <button
                                className="create-channel__modal-button create-channel__modal-button--close"
                                onClick={handleCloseModal}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateChannel;
