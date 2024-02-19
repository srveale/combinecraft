import React from 'react';

type PropsType = {
    text: string;
    selected: boolean;
    selectItem: (text: string) => void;
}

const Item: React.FC<PropsType> = ({ text, selected, selectItem }) => {
    const handleButtonClick = () => {
        selectItem(text);
    };

    return (
        <button 
            onClick={handleButtonClick} 
            className={selected ? 'selected' : ''}
        >
            {text}
        </button>
    );
};

export default Item;
