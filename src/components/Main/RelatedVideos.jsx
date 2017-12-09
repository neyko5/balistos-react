import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import RelatedVideoItem from './RelatedVideoItem';

function mapStateToProps(state) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const RelatedBox = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  float: left;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  padding-left: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  line-height: 26px;
`;

const Body = styled.div`
  padding: 12px 0px;
  width: 100%;
`;

const RelatedVideos = props => (
  <Box width={[1, 1, 1 / 2, 1 / 2]}>
    <RelatedBox>
      <Header>
        <HeaderTitle>Related videos</HeaderTitle>
      </Header>
      <Body>
        {props.related.map(video => (
          <RelatedVideoItem
            video={video}
            id={props.id}
            key={video.id.videoId}
          />))}
      </Body>
    </RelatedBox>
  </Box>
);

RelatedVideos.propTypes = {
  id: PropTypes.string,
  related: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
};

RelatedVideos.defaultProps = {
  id: undefined,
};

export default connect(mapStateToProps, undefined)(RelatedVideos);
