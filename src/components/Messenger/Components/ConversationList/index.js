import React, {Component} from 'react';
import ConversationListItem from '../ConversationListItem'

import './ConversationList.css'


class ConversationList extends Component {

    constructor(props) {
        super(props);

        this.onItemChoice = this.onItemChoice.bind(this);
    }

    onItemChoice(conversationId, e) {
        this.props.chooseConversation(conversationId)
    }

    render() {
        return (
            <div className="conversation-list">
                {
                    this.props.conversations.map(c =>
                        <ConversationListItem
                            key={c.id}
                            name={c.name}
                            description={c.description}
                            onClick={(e) => this.onItemChoice(c.id, e)}
                        />)
                }
            </div>
        );
    }
}


export default ConversationList;