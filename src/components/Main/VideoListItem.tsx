import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import deleteIcon from '../../img/del.png';
import ThumbsUpSVG from '../../img/thumbs_up.svg';

import { VideoType, AuthUserType } from '../../types';
import {
    deleteVideoFromPlaylist,
    toggleLikeVideo,
} from '../../services/firestore.service';

const PlaylistItem = styled.div`
    justify-content: space-between;
    width: 100%;
    height: 100px;
    padding: 5px 5px 5px 10px;
    position: relative;
    align-items: center;
    display: flex;
    ${(props: PlaylistItemProps) =>
        props.first &&
        css`
            background-color: rgba(0, 0, 0, 0.4);
        `}
    ${(props: PlaylistItemProps) =>
        props.next &&
        css`
            background-color: rgba(0, 0, 0, 0.2);
        `}
`;

interface PlaylistItemProps {
    next?: boolean;
    first?: boolean;
}

const Vote = styled.div`
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
`;

const VoteButton = styled.button`
    display: flex;
    padding: 0;
    border: none;
    outline: none;
    color: #696969;
    transition: color 0.1s ease-out, transform 0.1s ease-out;
    ${(props: VoteButtonProps) =>
        props.upActive &&
        css`
            color: #006144;
        `}
    ${(props: VoteButtonProps) =>
        props.downActive &&
        css`
            color: #892f2a;
        `}
`;

interface VoteButtonProps {
    upActive?: boolean;
    downActive?: boolean;
}

const SvgIcon = styled.svg`
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const Count = styled.div`
    color: #3e414c;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    ${(props: NumberProps) =>
        props.full &&
        css`
            line-height: 76px;
        `}
`;

interface NumberProps {
    full?: boolean;
}

const ImgWrapper = styled.div`
    position: relative;
`;

const Status = styled.div`
    position: absolute;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    line-height: 25px;
    width: 120px;
    font-size: 14px;
    font-style: italic;
    padding-left: 5px;
`;

const Image = styled.img`
    float: left;
    display: block;
    width: 120px;
    height: 90px;
`;
const Info = styled.div`
    float: left;
    padding: 0 8px;
    width: 100%;
    position: relative;
    height: 100%;
`;

const Title = styled.a`
    font-size: 15px;
    color: #000;
    display: block;
    max-height: 52px;
    line-height: 17px;
    overflow: hidden;
`;

const AddedBy = styled.div`
    color: #333;
    font-size: 12px;
    font-style: italic;
    margin-top: 3px;
`;

const Black = styled.span`
    color: #000;
`;

const DeleteColumn = styled.div`
    align-self: flex-start;
    width: 24px;
    float: left;
`;
const Delete = styled.button`
    width: 24px;
    height: 24px;
    float: left;
    background: url(${deleteIcon}) no-repeat 50%;
    cursor: pointer;
`;

const VideoListItem = (props: {
    video: VideoType;
    index: number;
    user: AuthUserType;
    id: string;
}) => {
    /*const upLike = props.video.likes.some(
        (like: LikeType) => like.userId === props.userId && like.value === 1
    );
    const downLike = props.video.likes.some(
        (like: LikeType) => like.userId === props.userId && like.value === -1
    );
    const likeCount = props.video.likes.reduce(
        (total: number, like: LikeType) => total + like.value,
        0
    );*/

    function deleteVideo() {
        deleteVideoFromPlaylist(props.id, props.video.id);
    }

    function like() {
        toggleLikeVideo(
            props.id,
            props.video.id,
            props.video.likes && props.video.likes.includes(props.user.uid)
        );
    }

    let playlistItemStatus = '';
    let playlistItemFirst = false;
    let playlistItemNext = false;
    if (props.index === 0) {
        playlistItemFirst = true;
        playlistItemStatus = 'Now playing';
    } else if (props.index === 1) {
        playlistItemNext = true;
        playlistItemStatus = 'Next';
    }

    return (
        <PlaylistItem first={playlistItemFirst} next={playlistItemNext}>
            {props.user ? (
                <Vote>
                    <VoteButton
                        upActive={
                            props.video.likes &&
                            props.video.likes.includes(props.user.uid)
                        }
                        onClick={like}
                    >
                        <SvgIcon>
                            <use xlinkHref={`${ThumbsUpSVG}#thumbs_up`} />
                        </SvgIcon>
                    </VoteButton>
                    <Count>
                        {(props.video.likes && props.video.likes.length) || 0}
                    </Count>
                </Vote>
            ) : (
                <Vote>
                    <Count full={true}>
                        {(props.video.likes && props.video.likes.length) || 0}
                    </Count>
                </Vote>
            )}

            <ImgWrapper>
                <Status>{playlistItemStatus}</Status>
                <Image
                    src={`https://img.youtube.com/vi/${props.video.youtubeId}/0.jpg`}
                    alt={props.video.title}
                />
            </ImgWrapper>
            <Info>
                <Title
                    className="title"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in YouTube"
                    href={`https://www.youtube.com/watch?v=${props.video.youtubeId}`}
                >
                    {props.video.title}
                </Title>
                <AddedBy>
                    added by{' '}
                    <Black>
                        {props.video.autoAdded
                            ? 'Balistos'
                            : props.video.creator.name}
                    </Black>
                </AddedBy>
            </Info>
            {props.user && (
                <DeleteColumn>
                    <Delete onClick={deleteVideo} />
                </DeleteColumn>
            )}
        </PlaylistItem>
    );
};

export default connect((state: any) => ({
    user: state.firebase.auth,
}))(VideoListItem);
