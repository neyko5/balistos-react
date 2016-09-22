let ChatForm = (props) => {
    let message;
    return (
        <div className="send">
            <form id="chat-form" role="form" onSubmit={e => {
                e.preventDefault()
                if (!message.value.trim()) {
                  return
                }
                props.sendMessage(message.value)
                message.value = ''
              }}>
                <textarea name="message" placeholder="Send a message" ref={node => { message = node }}></textarea>
                <button type="submit" className="button green chat">
                    <i className="icon message"></i>
                    Chat
                </button>
            </form>
        </div>
    );
};

module.exports = ChatForm;
