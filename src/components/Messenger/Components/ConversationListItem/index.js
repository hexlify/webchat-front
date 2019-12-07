import React from 'react'

import './ConversationListItem.css'


function ConversationListItem(props) {
    let {name, description, onClick} = props;
    if (name.length > 25) {
        name = name.slice(0, 22) + '...';
    }
    if (description.length > 25) {
        description = description.slice(0, 22) + '...';
    }

    return (

        <div className="conversation-list-item" onClick={onClick}>
            <h1 className="conversation-title">{name}</h1>
            <p className="conversation-desciption">{description}</p>
        </div>
    );
}


export default ConversationListItem;