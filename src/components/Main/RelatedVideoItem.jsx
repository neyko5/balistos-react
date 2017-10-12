import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addVideo, getRelatedVideos } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  id: state.playlist.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addVideo: () => {
    dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id, false));
    dispatch(getRelatedVideos(ownProps.video.id.videoId));
  },
});

const RelatedItem = styled.div`
  height: 70px;
  padding: 5px 0px 5px 5px;
  display: flex;
  flex-direction: row;
`

const Image = styled.img`
  height: 60px;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
`
const Info = styled.div`
  float: left;
  padding: 0 8px;
  width: 100%;
  position: relative;
  height: 100%;
`

const Title = styled.a`
  font-size: 14px;
  color: #333333;
  display: block;
  max-height: 52px;
  line-height: 17px;
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 1;
`

const AddButton = styled.button`
  border-radius: 0px;
  border: 1px solid #e6e6e6;
  background-color: white;
  color: #333333;
  font-size: 13px;
  font-weight: 700;
  width: 60px;
  height: 40px;
  flex-grow: 0;
  flex-shrink: 0;
`


const RelatedVideoItem = props => (
  <RelatedItem>
    <Image src={`https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`} alt={props.video.snippet.title} />
    <Info>
      <Title
        className="title"
        rel="noopener noreferrer"
        target="_blank"
        title={'Open in YouTube'}
        href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`}
      >{props.video.snippet.title}</Title>
    </Info>
    <AddButton onClick={props.addVideo}> Add</AddButton>
  </RelatedItem>
);

RelatedVideoItem.propTypes = {
  addVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
