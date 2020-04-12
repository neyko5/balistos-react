import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import ChatMessage, { Author } from './ChatMessage';

Enzyme.configure({ adapter: new Adapter() });

test('chats from current user should have author be displayed in green', () => {
    const chatMessage = mount(
        <ChatMessage
            user={{ id: '1', name: 'Tester 1' }}
            message={{
                id: '1',
                creator: { id: '1', name: 'Tester' },
                message: 'text',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(chatMessage.find(Author)).toHaveStyleRule('color', '#9FA600');
});

test('chats from other users chats should have author be displayed in default color', () => {
    const chatMessage = mount(
        <ChatMessage
            user={{ id: '1', name: 'Tester' }}
            message={{
                id: '1',
                creator: { id: '2', name: 'Tester 2' },
                message: 'text',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(chatMessage.find(Author)).toHaveStyleRule('color', '#3e414c');
});

test('chats should be displayed in default color if user is logged out', () => {
    const chatMessage = mount(
        <ChatMessage
            user={{ id: '1', name: 'Tester 1' }}
            message={{
                id: '1',
                creator: { id: '2', name: 'Tester 2' },
                message: 'text',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(chatMessage.find(Author)).toHaveStyleRule('color', '#3e414c');
});

test('chat should have title parameter set', () => {
    const chatMessage = mount(
        <ChatMessage
            user={{ id: '1', name: 'Tester' }}
            message={{
                id: '1',
                creator: { id: '2', name: 'Tester 2' },
                message: 'text',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(true).toBe(true);
    expect(chatMessage.find(Author).prop('title')).not.toBeFalsy();
});

test('should display authors username', () => {
    const chatMessage = shallow(
        <ChatMessage
            user={{ id: '1', name: 'Tester 1' }}
            message={{
                id: '1',
                creator: { id: '1', name: 'Tester 1' },
                message: 'text',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(chatMessage.contains('Tester 1')).toBe(true);
});

test('should display message content', () => {
    const testMessage = 'test message';
    const chatMessage = shallow(
        <ChatMessage
            user={{ id: '1', name: 'Tester 1' }}
            message={{
                id: '1',
                creator: { id: '1', name: 'Tester 1' },
                message: testMessage,
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    expect(chatMessage.contains(testMessage)).toBe(true);
});

test('should render correctly', () => {
    const chatMessage = renderer.create(
        <ChatMessage
            user={{ id: '1', name: 'Tester 1' }}
            message={{
                id: '1',
                creator: { id: '1', name: 'Tester 1' },
                message: 'test message',
                created_at: '2017-05-11T18:18:36.000Z',
            }}
        />
    );
    const tree = chatMessage.toJSON();
    expect(tree).toMatchSnapshot();
});
