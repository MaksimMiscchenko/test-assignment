import React from 'react';
import './Button.scss'

const Button = ({sendMessage}) => {
    return (
        <div >
           <button onClick={sendMessage} className='message__btn'>Отправить</button>
        </div>
    );
};

export default Button;