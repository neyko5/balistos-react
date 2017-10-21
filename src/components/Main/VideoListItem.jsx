import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { likeVideo, deleteVideo } from '../../actions';
import ThumbsUpSVG from '../../img/thumbs_up.svg';
import ThumbsDownSVG from '../../img/thumbs_down.svg';
import deleteIcon from '../../img/del.png';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  likeVideo: (value) => {
    dispatch(likeVideo(ownProps.video.id, value));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
});

const PlaylistItem = styled.div`
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 5px 5px 5px 10px;
  position: relative;
  align-items: center;
  display: flex;
  ${props => props.first && css`
    background-color: rgba(0,0,0,.4);
  `}
  ${props => props.next && css`
    background-color: rgba(0,0,0,.4);
  `}
`;

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
  transition: color .1s ease-out,transform .1s ease-out;
  ${props => props.upActive && css`
    color: #006144;
  `}
  ${props => props.downActive && css`
    color: #892f2a;
  `}
`;

const SvgIcon = styled.svg`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const Number = styled.div`
  color: #3e414c;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  ${props => props.full && css`
    line-height: 76px;
  `}
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Status = styled.div`
  position: absolute;
  color: #fff;
  background: rgba(0,0,0,.6);
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

const VideoListItem = (props) => {
  const upLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === 1);
  const downLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === -1);
  const likeCount = props.video.likes
    .reduce((total, like) => total + like.value, 0);

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
      {props.userId ?
        <Vote>
          <VoteButton
            upActive={upLike}
            onClick={() => props.likeVideo(upLike ? 0 : 1)}
            title={props.video.likes.filter(like => like.value === 1)
              .map(like => like.user.username).join(', ')}
          >
            <SvgIcon>
              <use xlinkHref={`${ThumbsUpSVG}#thumbs_up`} />
            </SvgIcon>
          </VoteButton>
          <Number>{likeCount}</Number>
          <VoteButton
            downActive={upLike}
            onClick={() => props.likeVideo(downLike ? 0 : -1)}
            title={props.video.likes.filter(like => like.value === -1)
              .map(like => like.user.username).join(', ')}
          >
            <SvgIcon>
              <use xlinkHref={`${ThumbsDownSVG}#thumbs_down`} />
            </SvgIcon>
          </VoteButton>
        </Vote> :
        <Vote>
          <Number full>{likeCount}</Number>
        </Vote>}
      <ImgWrapper>
        <Status>{playlistItemStatus}</Status>
        <Image src={`https://img.youtube.com/vi/${props.video.video.youtubeId}/0.jpg`} alt={props.video.video.title} />
      </ImgWrapper>
      <Info>
        <Title
          className="title"
          target="_blank"
          rel="noopener noreferrer"
          title="Open in YouTube"
          href={`https://www.youtube.com/watch?v=${props.video.video.youtubeId}`}
        >{props.video.video.title}
        </Title>
        <AddedBy>
          added by <Black>{props.video.autoAdded ? 'Balistos' : props.video.user.username}</Black>
        </AddedBy>
      </Info>
      {props.userId ?
        <DeleteColumn>
          <Delete onClick={() => props.deleteVideo(props.video.id)} />
        </DeleteColumn> : undefined}
    </PlaylistItem>
  );
};

VideoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  userId: PropTypes.number,
  deleteVideo: PropTypes.func.isRequired,
  likeVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
    })).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

VideoListItem.defaultProps = {
  userId: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
