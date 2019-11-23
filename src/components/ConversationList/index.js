import React, {Component} from 'react';
import ConversationListItem from '../ConversationListItem'

import './ConversationList.css'


const tempConversations = [
    {
        id: 1,
        name: 'Conv1',
        description: 'Veryyyyyyyyyyyyyyy long description'
    },
    {
        id: 2,
        name: 'Veryyyyyyyyyyyyyyyyyyyyyyyy long title',
        description: 'Description2'
    },
    {
        id: 3,
        name: 'Conv3',
        description: 'Description3'
    }
];


class ConversationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: tempConversations
        }

        this.getConversations = this.getConversations.bind(this);
    }

    getConversations() {

    }

    render() {
        return (
            <div className="conversation-list">
                {
                    this.state.conversations.map(c =>
                        <ConversationListItem
                            key={c.id}
                            name={c.name}
                            description={c.description}
                        />)
                }
            </div>
        );
    }
}


export default ConversationList;