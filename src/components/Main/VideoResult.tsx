import React from 'react';
import styled, { css } from 'styled-components';

const Result = styled.button`
    width: 100%;
    padding: 1px 5px;
    cursor: pointer;
    display: flex;
    ${(props: ResultProps) =>
        props.active &&
        css`
            background: #e8e8e8;
        `}
`;

type ResultProps = {
    active?: boolean;
};

const Image = styled.img`
    margin-right: 10px;
    height: 40px;
    width: 60px;
`;

const Title = styled.div`
    line-height: 40px;
    font-size: 14px;
    color: #333;
    width: calc(100% - 70px);
    overflow: hidden;
    height: 40px;
`;

const VideoResult = (props: Props) => {
    function addVideo() {
        props.addVideo(props.id, props.title);
    }

    return (
        <Result onClick={addVideo} active={props.active}>
            <Image src={props.image} alt={props.title} />
            <Title>{props.title}</Title>
        </Result>
    );
};

type Props = {
    addVideo: (videoId: string, title: string) => void;
    active: boolean;
    image: string;
    title: string;
    id: string;
};

export default VideoResult;
