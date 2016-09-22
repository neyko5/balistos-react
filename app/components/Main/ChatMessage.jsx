let ChatMessage = (props) => {
    return (
        <div className="message">
            <span className="author red">{props.user}:</span><span>{props.message}</span>
        </div>
    );
}

module.exports = ChatMessage;
