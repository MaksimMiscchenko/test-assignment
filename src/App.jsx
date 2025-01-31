import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';
import Room from "./pages/Room/Room.jsx";

import User from "./Components/Header/User.jsx";

const App = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/" && <User/>}
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/room/:id" element={<Room/>}/>
            </Routes>
        </>);
};

export default App;
