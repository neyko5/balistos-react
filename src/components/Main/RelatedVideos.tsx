import { Box } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { YoutubeResultVideoType } from '../../types/index';
import RelatedVideoItem from './RelatedVideoItem';

const RelatedBox = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
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

type Props = {
    id: string;
    related: YoutubeResultVideoType[];
};

const RelatedVideos = (props: Props) => (
    <Box width={[1, 1, 1 / 2, 1 / 2]}>
        <RelatedBox>
            <Header>
                <HeaderTitle>Related videos</HeaderTitle>
            </Header>
            <Body>
                {props.related.map((video: YoutubeResultVideoType) => (
                    <RelatedVideoItem
                        video={video}
                        id={props.id}
                        key={video.id.videoId}
                    />
                ))}
            </Body>
        </RelatedBox>
    </Box>
);
export default RelatedVideos;
