import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import 'jest-styled-components'


import ChatMessage, {Author} from './ChatMessage';

Enzyme.configure({ adapter: new Adapter()});



test('chats from current user should have author be displayed in green', () => {
  const chatMessage = mount(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username: 'testuser' },
          message: 'text',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(chatMessage.find(Author)).toHaveStyleRule('color', '#9FA600');
});

test('chats from other users chats should have author be displayed in default color', () => {
  const chatMessage = mount(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username: 'otheruser' },
          message: 'text',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(chatMessage.find(Author)).toHaveStyleRule('color', '#3e414c');
});

test('chats should be displayed in default color if user is logged out', () => {
  const chatMessage = mount(
    <ChatMessage
      message={
        {
          user: { username: 'otheruser' },
          message: 'text',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(chatMessage.find(Author)).toHaveStyleRule('color', '#3e414c');
});

test('chat should have title parameter set', () => {
  const chatMessage = mount(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username: 'otheruser' },
          message: 'text',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(true).toBe(true);  
  expect(chatMessage.find(Author).prop('title')).not.toBeFalsy();
});

test('should display authors username', () => {
  const username = 'authoruser';
  const chatMessage = shallow(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username },
          message: 'text',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(chatMessage.contains(username)).toBe(true);
});

test('should display message content', () => {
  const testMessage = 'test message';
  const chatMessage = shallow(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username: 'testuser' },
          message: testMessage,
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  expect(chatMessage.contains(testMessage)).toBe(true);
});

test('should render correctly', () => {
  const chatMessage = renderer.create(
    <ChatMessage
      username={'testuser'}
      message={
        {
          user: { username: 'testuser' },
          message: 'test message',
          createdAt: '2017-05-11T18:18:36.000Z',
        }
      }
    />);
  const tree = chatMessage.toJSON();
  expect(tree).toMatchSnapshot();
});
