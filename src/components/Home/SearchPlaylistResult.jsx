import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const PlaylistResult = styled(Link)`
  border-bottom: 1px solid #cccccc;
  padding: 5px 10px;
  text-decoration: none;
  color: #3e414c;
  display: block;
  &:hover {
    background: #ffffff;
  }
`;

const PlaylistResultTitle = styled.div`
  width: 100%;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
`;
const PlaylistResultDescription = styled.div`
  line-height: 16px;
  font-size: 13px;
`;

const SearchPlaylistResult = props => (
  <PlaylistResult to={`/playlist/${props.result.id}`}>
    <PlaylistResultTitle>{props.result.title}</PlaylistResultTitle>
    <PlaylistResultDescription>{props.result.description}</PlaylistResultDescription>
  </PlaylistResult>
);

SearchPlaylistResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchPlaylistResult;
