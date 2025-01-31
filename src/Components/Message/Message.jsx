import React from "react";
import "./Message.scss";

const Message = ({message}) => {
    if (!message) return null;

    const {content, timestamp, userName} = message;

    const formatTime = (timestamp) => {
        if (!timestamp) return "Unknown time";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    };
    return (
        <div className="message">
            <div className="message__header">
                <span className="message__username">{userName || `User ${userName}`}</span>
                <span className="message__time">{formatTime(timestamp)}</span>
            </div>
            <div className="message__content">{content}</div>
        </div>
    );
};

export default Message;
