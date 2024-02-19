import React from 'react';

import Item from './item';

type ItemType = { text: string, };

type PropsType = {
    items: ItemType[];
    selectedItems: string[];
    selectItem: (text: string) => void;
}

const AvailableItems: React.FC<PropsType> = ({ items, selectedItems, selectItem }) => {
    return (
        items.map((item: ItemType, index: number) => {
            const selected = selectedItems.includes(item.text);
            return <Item key={index} text={item.text} selected={selected} selectItem={selectItem}/>
        })
    );
};

export default AvailableItems;
