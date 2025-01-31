import {useLocation} from 'react-router-dom'; // useParams для получения id комнаты
import Search from "./Search.jsx";
import './Header.scss';

const Header = ({roomId}) => {
    const location = useLocation();

    return (
        <div className='header'>
            {location.pathname !== "/chat" && <Search roomId={roomId}/>}
        </div>
    );
};

export default Header;
