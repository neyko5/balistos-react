import React from 'react';
import styled from 'styled-components';
import { YoutubeResultVideoType } from '../../types';
import { addVideoToPlaylist } from '../../services/firestore.service';

const RelatedItem = styled.div`
    height: 70px;
    padding: 5px 0px 5px 5px;
    display: flex;
    flex-direction: row;
`;

const Image = styled.img`
    height: 60px;
    width: auto;
    flex-grow: 0;
    flex-shrink: 0;
`;
const Info = styled.div`
    padding: 0 8px;
    width: 100%;
    position: relative;
    height: 100%;
`;

const Title = styled.a`
    font-size: 14px;
    color: #333333;
    display: block;
    max-height: 52px;
    line-height: 17px;
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
`;

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
`;

const RelatedVideoItem = (props: {
    video: YoutubeResultVideoType;
    id: string;
}) => {
    function addVideo() {
        addVideoToPlaylist(
            props.id,
            props.video.id.videoId,
            props.video.snippet.title
        );
    }
    return (
        <RelatedItem>
            <Image
                src={`https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`}
                alt={props.video.snippet.title}
            />
            <Info>
                <Title
                    className="title"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Open in YouTube"
                    href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`}
                >
                    {props.video.snippet.title}
                </Title>
            </Info>
            <AddButton onClick={addVideo}> Add</AddButton>
        </RelatedItem>
    );
};
export default RelatedVideoItem;
