import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Input from '../common/Input';
import { AuthUserType } from '../../types';
import { addChatToPlaylist } from '../../services/firestore.service';

const Send = styled.div`
    padding: 10px;
    background: #e8e8e8;
    width: 100%;
`;

interface Props {
    id: string;
    user: AuthUserType;
}

const ChatForm = (props: Props) => {
    const [message, setMessage] = React.useState('');

    function handleChange(event: FormEvent<HTMLFormElement>): void {
        if (event.target instanceof HTMLInputElement) {
            setMessage(event.target.value);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!message.trim()) {
            return;
        }
        addChatToPlaylist(props.id, message);
        setMessage('');
    }

    return (
        <Send>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Send a message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                />
                <Button type="submit" color="green" right={true}>
                    <Icon message={true} /> Chat
                </Button>
            </form>
        </Send>
    );
};

export default connect((state: any) => ({
    user: state.firebase.auth,
}))(ChatForm) as React.ComponentType<any>;
