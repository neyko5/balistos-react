import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

Enzyme.configure({ adapter: new Adapter()});

const messages = [
  {
    id: 1,
    user: { username: 'otheruser' },
    message: 'text 1',
    createdAt: '2017-04-11T18:18:36.000Z',
  },
  {
    id: 2,
    user: { username: 'otheruser' },
    message: 'text 2',
    createdAt: '2017-05-11T18:18:36.000Z',
  },
  {
    id: 3,
    user: { username: 'otheruser' },
    message: 'text 3',
    createdAt: '2017-06-11T18:18:36.000Z',
  },
];
const username = 'testuser';

it('should show chat form for logged in user', () => {
  const chat = shallow(
    <Chat messages={messages} username={username} sendMessage={jest.fn()} />,
  );
  expect(chat.find(ChatForm).length).toBe(1);
});

it('should show not show chat form for non-logged in user', () => {
  const chat = shallow(
    <Chat messages={messages} sendMessage={jest.fn()} />,
  );
  expect(chat.find(ChatForm).length).toBe(0);
});

it('should render three messages', () => {
  const chat = shallow(
    <Chat messages={messages} sendMessage={jest.fn()} />,
  );
  expect(chat.find(ChatMessage).length).toBe(3);
});


test('should render correctly', () => {
  const chat = renderer.create(
    <Chat messages={messages} username={username} sendMessage={jest.fn()} />,
  );
  const tree = chat.toJSON();
  expect(tree).toMatchSnapshot();
});
