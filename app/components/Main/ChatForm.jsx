var ChatForm = React.createClass({
    submitForm: function(e){
        e.preventDefault()
        if (!this.state.message.trim()) {
            return
        }
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    },
    getInitialState: function() {
        return {
            message: '',
        };
    },
    handleChange(event) {
        this.setState({message: event.target.value});
    },
    render: function(){
        let message;
        return (
            <div className="send">
                <form onSubmit={this.submitForm}>
                    <input type="text" placeholder="Send a message" onChange={this.handleChange} value={this.state.message} />
                    <button type="submit" className="button green chat">
                        <i className="icon message"></i>
                        Chat
                    </button>
                </form>
            </div>
        );
    }
});

module.exports = ChatForm;
