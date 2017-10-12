import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const Result = styled.button`
  width: 100%;
  padding: 1px 5px;
  cursor: pointer;
  ${props => props.active && css`
    background: #e8e8e8;
  `}
`

const Image = styled.img`
  float: left;
  margin-right: 10px;
  height: 40px;
  width: 60px;
`

const Title = styled.div`
  line-height: 40px;
  float: left;
  font-size: 14px;
  color: #333;
  width: calc(100% - 70px);
  overflow: hidden;
  height: 40px;
`

const VideoResult = props => (
  <Result onClick={props.onItemClick} active={props.active}>
    <Image src={props.image} alt={props.title} />
    <Title>{props.title}</Title>
  </Result>
);

VideoResult.propTypes = {
  active: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoResult;
