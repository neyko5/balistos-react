import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

Enzyme.configure({ adapter: new Adapter() });

const messages = [
    {
        id: '1',
        creator: { id: '2', name: 'Tester 2' },
        message: 'text 1',
        created_at: '2017-04-11T18:18:36.000Z',
    },
    {
        id: '2',
        creator: { id: '1', name: 'Tester 1' },
        message: 'text 2',
        created_at: '2017-05-11T18:18:36.000Z',
    },
    {
        id: '3',
        creator: { id: '2', name: 'Tester 2' },
        message: 'text 3',
        created_at: '2017-06-11T18:18:36.000Z',
    },
];
const user = { id: '1', name: 'Tester 1' };
const noUser = { isEmpty: true };

it('should show chat form for logged in user', () => {
    const chat = shallow(<Chat messages={messages} user={user} id="1" />);
    expect(chat.find(ChatForm).length).toBe(1);
});

it('should show not show chat form for non-logged in user', () => {
    const chat = shallow(<Chat messages={messages} user={noUser} id="1" />);
    expect(chat.find(ChatForm).length).toBe(0);
});

it('should render three messages', () => {
    const chat = shallow(<Chat messages={messages} user={user} id="1" />);
    expect(chat.find(ChatMessage).length).toBe(3);
});

test('should render correctly', () => {
    const chat = renderer.create(
        <Chat messages={messages} user={user} id="1" />
    );
    const tree = chat.toJSON();
    expect(tree).toMatchSnapshot();
});
