import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthUserType } from '../../types/index';
import VideoResult from './VideoResult';
import { addVideoToPlaylist } from '../../services/firestore.service';
import { searchYoutubeVideos } from '../../services/youtube.service';

const Search = styled.div`
    position: relative;
    width: 100%;
    padding: 5px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 0px;
    line-height: 18px;
    font-size: 13px;
    color: #333333;
    background-color: white;
    padding: 11px 10px;
    margin: 0px;
`;

const SearchResults = styled.div`
    position: absolute;
    top: 43px;
    width: calc(100% - 10px);
    z-index: 20;
    background: #f6f6f6;
    border: 1px solid #cccccc;
    border-radius: 3px;
    list-style: none;
    padding: 0px;
    text-align: left;
`;

type Props = {
    id: string;
    user: AuthUserType;
};

const SearchVideo = (props: Props) => {
    const [results, setResults] = React.useState<any[]>([]);
    const [query, setQuery] = React.useState('');
    const [index, setIndex] = React.useState(0);

    const addVideo = React.useCallback(
        (videoId: string, title: string) => {
            addVideoToPlaylist(props.id, videoId, title);
        },
        [props.id]
    );

    const handleKeyEvent = React.useCallback(
        (event: KeyboardEvent) => {
            const key = event.key;
            switch (key) {
                case 'ArrowUp':
                    setIndex(index - 1);
                    break;
                case 'ArrowDown':
                    setIndex(index + 1);
                    break;
                case 'Enter':
                    setIndex(index < 0 ? (5 + index) % 5 : index % 5);
                    if (results[index]) {
                        addVideo(
                            results[index].id.videoId,
                            results[index].snippet.title
                        );
                    }
                    break;
                case 'Escape':
                    setResults([]);
                    setQuery('');
                    break;
                default:
                    break;
            }
        },
        [addVideo, index, results]
    );

    React.useEffect(() => {
        document.addEventListener('keyup', handleKeyEvent, false);
        return () =>
            document.removeEventListener('keyup', handleKeyEvent, false);
    }, [index, results, handleKeyEvent]);

    function searchYoutube(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setQuery(value);
        searchYoutubeVideos(value).then((res) => {
            setResults(res);
        });
    }

    return (
        <Search>
            <SearchInput
                type="text"
                placeholder="Search for YouTube video and add to playlist"
                onChange={searchYoutube}
                value={query}
                autoComplete="off"
            />
            {results && query && (
                <SearchResults>
                    {results.map((result: any, i: number) => (
                        <VideoResult
                            title={result.snippet.title}
                            image={result.snippet.thumbnails.default.url}
                            id={result.id.videoId}
                            key={result.id.videoId}
                            active={i === index % 5 || i === (5 + index) % 5}
                            addVideo={addVideo}
                        />
                    ))}
                </SearchResults>
            )}
        </Search>
    );
};

export default connect((state: any) => ({
    user: state.firebase.auth,
}))(SearchVideo);
