var React = require('react');

const ChatMessage = (props) =>{
    return (
        <div className="message">
            <span className="author red">{props.id_user}</span><span>{props.message}</span>
        </div>
    );
}

module.exports = ChatMessage;