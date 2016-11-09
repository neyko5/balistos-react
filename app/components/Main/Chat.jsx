import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';

let Chat = (props) => {
    return (
        <div className="box">
            <div className="header">
                <i className="icon chat"></i>
                <div className="title">Chat with your buddies</div>
            </div>
            <div className="chatbox">
                {props.messages.sort((a, b) => a.created_at < b.created_at ? -1 : 1).map(function(message){
                    return <ChatMessage message={message} username={props.username} key={message.id}/>
                })}
            </div>
            {props.username?<ChatForm sendMessage={props.sendMessage} />:undefined}
        </div>
    );
};

export default Chat;
