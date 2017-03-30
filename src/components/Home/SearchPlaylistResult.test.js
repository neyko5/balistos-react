import React from 'react';
import renderer from 'react-test-renderer';
import SearchPlaylistResult from './SearchPlaylistResult';

it('renders correctly', () => {
  const tree = renderer.create(
    <SearchPlaylistResult result={{ id: '2', title: 'ssd', description: 'dsd' }} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
