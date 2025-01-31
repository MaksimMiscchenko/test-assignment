import {useEffect, useRef, useState} from "react";
import Message from "./Message.jsx";
import Button from "./Button.jsx";
import "./MessageArea.scss";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, sendMessage} from "../../store/actions/messagesActions.js";
import {useParams} from "react-router-dom";

const MessageArea = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const params = useParams();
    const messages = useSelector((state) => state.messages.messages);
    const messageEndRef = useRef(null);

    const generateMessageId = () => {
        return Date.now().toString(36);
    };

    const timestamp = new Date().toISOString();

    const handleCreateChannel = async () => {
        if (!message.trim()) return;

        const messageId = generateMessageId();
        await dispatch(
            sendMessage({
                messageId,
                content: message.trim(),
                timestamp,
                userId: user.id,
                roomId: params.id,
                userName: user.username,
            })
        );

        setMessage("");
    };

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    const filteredMessages = messages.filter((msg) => msg.roomId === params.id);
    const sortedMessages = filteredMessages.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <div className="messageContainer">
            <div className="messageArea">
                {sortedMessages.map((msg) => (
                    <Message key={msg.messageId} message={msg}/>
                ))}
                <div ref={messageEndRef}/>
            </div>
            <div className="messageArea__send">
                <input
                    type="text"
                    className="messageArea__send--input"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button sendMessage={handleCreateChannel} className="messageArea__send--send"/>
            </div>
        </div>
    );
};

export default MessageArea;
