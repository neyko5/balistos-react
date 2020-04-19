import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ChatMessageType, UserType, AuthUserType } from '../../types/index';
import Chat from './Chat';
import ChatOnline from './ChatOnline';

import { firestoreConnect } from 'react-redux-firebase';

type Props = {
    id: string;
    users: UserType[];
    chats: ChatMessageType[];
    user: AuthUserType;
};

const ChatContainer = (props: Props) => {
    return (
        <Box width={[1, 1, 1 / 2, 1 / 2]}>
            {props.users && props.users.length && (
                <ChatOnline users={props.users} user={props.user} />
            )}
            <Chat id={props.id} messages={props.chats} user={props.user} />
        </Box>
    );
};

export default compose(
    firestoreConnect((props: any) => [
        {
            collection: `playlists/${props.id}/chats`,
            storeAs: 'chats',
        },
    ]),
    connect((state: any) => ({
        user: state.firebase.auth,
        chats: state.firestore.ordered.chats || [],
    }))
)(ChatContainer) as React.ComponentType<any>;
