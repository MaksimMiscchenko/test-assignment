import './RemoveButton.scss'

const RemoveButton = ({onClick}) => {
    return (
        <div>
            <button className='btn' onClick={onClick}></button>
        </div>
    );
};

export default RemoveButton;