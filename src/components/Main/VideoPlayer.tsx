import { Box } from 'grid-styled';
import React from 'react';
import ReactSlider from 'react-slider';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';
import vTime from 'video-time';

import pauseIcon from '../../img/pause.png';
import playIcon from '../../img/play.png';
import speakerIcon from '../../img/volume.png';
import { youtubeParams } from '../../settings';

import { VideoType } from '../../types';
import { finishVideo } from '../../services/firestore.service';

const MainWindow = styled.div`
    background: #ffffff;
    width: 100%;
    margin: 10px 0 0;
`;

const Video = styled.div`
    width: 100%;
    iframe {
        width: 100%;
        height: 410px;
        display: block;
    }
`;

const Player = styled.div`
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0;
    cursor: default;
    &:hover {
        opacity: 0.1;
    }
`;

const VideoEmpty = styled.div`
    height: 400px;
    padding-top: 160px;
    background-color: #000000;
    text-align: center;
    vertical-align: middle;
`;
const EmptyTextBig = styled.div`
    font-size: 24px;
    color: #dcdcdc;
`;

const EmptyTextSmall = styled.div`
    font-size: 16px;
    color: #666666;
`;

const Progress = styled.div`
    width: 100%;
    height: 5px;
    background: #dcdcdc;
`;

const Bar = styled.div`
    width: ${(props: BarProps) => props.width || 0}%;
    background: #d96459;
    height: 5px;
    max-width: 100%;
`;

interface BarProps {
    width?: number;
}

const Toolbar = styled.div`
    width: 100%;
    height: 35px;
    background: #4d4c4c;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
`;

const Controls = styled.div`
    display: flex;
`;

const ControlButton = styled.button`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 5px;
    outline: none;
    ${(props: ControlButtonProps) =>
        props.pause &&
        css`
            background: url(${pauseIcon}) no-repeat 50%;
        `}
    ${(props: ControlButtonProps) =>
        props.play &&
        css`
            background: url(${playIcon}) no-repeat 50%;
        `}
`;

interface ControlButtonProps {
    pause?: boolean;
    play?: boolean;
}

const Timer = styled.div`
    margin-left: 20px;
    display: flex;
`;

const Time = styled.div`
    font-weight: 600;
    line-height: 22px;
    color: #fff;
    font-size: 12px;
    ${(props: TimeProps) =>
        props.total &&
        css`
            margin-left: 6px;
            color: #999;
        `}
`;

interface TimeProps {
    total?: boolean;
}

const Volume = styled.div`
    display: flex;
    .slider {
        width: 64px;
        margin-top: 9px;
        height: 5px;
        background: #dcdcdc;
        cursor: pointer;
        .handle {
            width: 5px;
            height: 13px;
            top: -4px;
            left: 40%;
            background: #fff;
            position: absolute;
        }
    }
`;

const Speaker = styled.button`
    width: 16px;
    height: 22px;
    background: url(${speakerIcon}) 50% no-repeat;
    margin-right: 10px;
    cursor: pointer;
    outline: none;
`;
const PlaylistHeader = styled.div`
    padding-right: 10px;
    width: 100%;
    height: 40px;
    line-height: 46px;
    border-bottom: 1px solid #e1e1e1;
    font-size: 14px;
    font-style: italic;
`;

const PlaylistTitle = styled.span`
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
`;

const Created = styled.span``;

const PlaylistUsername = styled.span`
    font-style: italic;
`;

const StyledThumb = styled.div`
    width: 5px;
    height: 13px;
    top: -4px;
    position: absolute;
    background: rgb(255, 255, 255);
    cursor: grab;
`;

const Thumb = (props: any) => <StyledThumb {...props} />;

interface Props {
    current: VideoType | false;
    playlistTitle: string;
    playlistUsername: string;
    id: string;
}

const VideoPlayer = (props: Props) => {
    const [elapsed, setElapsed] = React.useState<number>(0);
    const [total, setTotal] = React.useState<number>(0);
    const [volume, setVolume] = React.useState<number>(100);
    const [previousVolume, setPreviousVolume] = React.useState<number>(0);
    const [paused, setPaused] = React.useState<boolean>(false);

    const timeout = React.useRef(0);
    const player = React.useRef<any>(null);

    /*function componentDidUpdate(prevProps: Props) {
        if (
            prevProps.current &&
            this.props.current &&
            prevProps.current.youtubeId !== this.props.current.youtubeId
        ) {
            if (this.state.player) {
                this.state.player.seekTo(0);
            }
            this.resumeVideo();
            this.props.startVideo(this.props.current.id);
            this.props.getRelatedVideos(this.props.current.youtubeId);
        }
        if (!prevProps.current && this.props.current) {
            this.props.startVideo(this.props.current.id);
            this.props.getRelatedVideos(this.props.current.youtubeId);
            if (this.state.player) {
                this.state.player.seekTo(this.props.current.startedAt);
            }
        }
        if (
            this.props.current &&
            (!prevProps.current ||
                prevProps.current.youtubeId !== this.props.current.youtubeId)
        ) {
            const options = {
                body: this.props.current.title,
                icon: `https://img.youtube.com/vi/${this.props.current.youtubeId}/0.jpg`,
                tag: 'video',
                requireInteraction: false,
            };
            new (window as any).Notification(
                `Balistos - ${this.props.playlistTitle}`,
                options
            );
        }
    }*/

    React.useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, []);

    function onReady(event: Event) {
        player.current = event.target;
        setTimeout(updateElapsed, 500);
    }

    function onSpeakerClick(): void {
        if (volume === 0) {
            setVolume(previousVolume);
            setPreviousVolume(0);
            player.current.setVolume(previousVolume);
        } else {
            setPreviousVolume(volume);
            setVolume(0);
            player.current.setVolume(0);
        }
    }

    function onSliderChange(value: any) {
        setVolume(value);

        player.current.setVolume(value);
    }

    function finishCurrentVideo() {
        if (props.current) {
            finishVideo(props.id, props.current.id);
        }
    }

    function play() {
        setPaused(false);
        player.current.playVideo();
    }

    function pause() {
        setPaused(true);
        player.current.pauseVideo();
    }

    function updateElapsed() {
        setElapsed(player?.current.getCurrentTime());
        setTotal(player.current.getDuration());
        timeout.current = setTimeout(updateElapsed, 500);
    }

    return (
        <Box width={[1, 1, 1 / 2, 1 / 2]}>
            <MainWindow>
                <Video>
                    <Player>
                        <Overlay />
                        {props.current ? (
                            <YouTube
                                videoId={props.current.youtubeId}
                                opts={youtubeParams}
                                onReady={onReady}
                                onEnd={finishCurrentVideo}
                            />
                        ) : (
                            <VideoEmpty>
                                <EmptyTextBig>No video</EmptyTextBig>
                                <EmptyTextSmall>
                                    Make sure you add some new videos to the
                                    playlist
                                </EmptyTextSmall>
                            </VideoEmpty>
                        )}
                    </Player>
                    <Progress>
                        <Bar width={total ? (elapsed * 100) / total : 0} />
                    </Progress>
                    <Toolbar>
                        <Controls>
                            {paused ? (
                                <ControlButton play={true} onClick={play} />
                            ) : (
                                <ControlButton pause={true} onClick={pause} />
                            )}
                        </Controls>
                        <Timer>
                            <Time>{vTime(elapsed)}</Time>
                            <Time total={true}> / {vTime(total)} </Time>
                        </Timer>
                        <Volume>
                            <Speaker
                                className="speaker"
                                onClick={onSpeakerClick}
                            />
                            <ReactSlider
                                defaultValue={100}
                                value={volume}
                                renderThumb={Thumb}
                                onChange={onSliderChange}
                            />
                        </Volume>
                    </Toolbar>
                </Video>
            </MainWindow>
            <PlaylistHeader>
                <PlaylistTitle>{props.playlistTitle}</PlaylistTitle>
                <Created> created by </Created>
                <PlaylistUsername>{props.playlistUsername}</PlaylistUsername>
            </PlaylistHeader>
        </Box>
    );
};

export default VideoPlayer;
