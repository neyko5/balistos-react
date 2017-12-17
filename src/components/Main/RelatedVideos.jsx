// @flow

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import RelatedVideoItem from './RelatedVideoItem';
import type { YoutubeResultVideoType } from '../../types/index';

function mapStateToProps(state: any) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const mapDispatchToProps = () => ({
});

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

const RelatedVideos = (props: {
  id: string,
  related: Array<YoutubeResultVideoType>,
}) => (
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
export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideos);
