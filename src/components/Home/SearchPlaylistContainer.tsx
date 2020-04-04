import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import searchIcon from '../../img/search-white.png';
import transparentImg from '../../img/transparent.png';
import Input from '../common/Input';
import SearchPlaylistResult from './SearchPlaylistResult';

const SearchPlaylist = styled.div`
    max-width: 620px;
    height: 55px;
    background: url(${transparentImg});
    padding: 10px;
    border-radius: 5px;
    margin: 0px auto;
    position: relative;
`;

const SearchPlaylistInner = styled.div`
    display: flex;
`;

const SearchIcon = styled.div`
    width: 54px;
    height: 35px;
    float: left;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #000 url(${searchIcon}) 50% no-repeat;
    flex-shrink: 0;
`;

const SearchResults = styled.ul`
    position: absolute;
    top: 45px;
    width: calc(100% - 20px);
    background: #fff;
    z-index: 20;
    background: #f6f6f6;
    border: 1px solid #ccc;
    border-radius: 3px;
    float: left;
    list-style: none;
    margin: 0;
    padding: 0;
    &:empty {
        display: none;
    }
`;

const SearchPlaylistContainer = (props: any) => {
    const [results, setResults] = React.useState<any[]>([]);
    const [query, setQuery] = React.useState('');

    async function searchForPlaylists(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setQuery(value);
        const filteredPlaylists: any[] = props.playlists.filter(
            (playlist: any) => {
                return playlist.title
                    .toLowerCase()
                    .startsWith(value.toLowerCase());
            }
        );
        setResults(filteredPlaylists);
    }

    return (
        <SearchPlaylist>
            <SearchPlaylistInner>
                <Input
                    type="text"
                    placeholder="Search playlist"
                    search={true}
                    value={query}
                    name="query"
                    onChange={searchForPlaylists}
                />
                <SearchIcon />
                <SearchResults data-cy="search-results">
                    {results.map((result: any) => (
                        <SearchPlaylistResult key={result.id} result={result} />
                    ))}
                </SearchResults>
            </SearchPlaylistInner>
        </SearchPlaylist>
    );
};

export default connect((state: any) => ({
    playlists: state.firestore.ordered.playlists || [],
}))(SearchPlaylistContainer) as React.ComponentType;
