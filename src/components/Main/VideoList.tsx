import React from 'react';
import styled from 'styled-components';

import VideoListItem from './VideoListItem';

import { VideoType } from '../../types';

const EmptyItem = styled.div`
    color: #3e414c;
    padding: 10px;
`;

const List = styled.div`
    width: 100%;
`;

const VideoList = (props: {
    videos: VideoType[];
    current: VideoType;
    id: string;
}) => {
    if (!props.videos.length) {
        return (
            <EmptyItem>
                Playlist is empty. Please search and add a video.
            </EmptyItem>
        );
    }

    return (
        <List>
            {props.current && (
                <VideoListItem
                    video={props.current}
                    key={props.current.id}
                    id={props.id}
                    index={0}
                />
            )}
            {props.videos.map((video: VideoType, index: number) => (
                <VideoListItem
                    video={video}
                    key={video.id}
                    id={props.id}
                    index={index + 1}
                />
            ))}
        </List>
    );
};

export default VideoList;
