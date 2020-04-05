import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserType } from '../../types';

const Playlist = styled(Link)`
    background: #ddd;
    margin: 0px 8px 8px 8px;
    width: 100%;
    display: flex;
    text-decoration: none;
    flex: 1 0 40%;
    @media (max-width: 479px) {
        flex: 1 0 80%;
    }
`;

const Place = styled.div`
    width: 54px;
    height: 54px;
    background: #fff;
    color: #758000;
    font-size: 34px;
    font-weight: 300;
    line-height: 54px;
    text-align: center;
`;

const Square = styled.div`
    padding: 5px;
`;

const Title = styled.div`
    font-size: 20px;
    color: #333;
`;

const Created = styled.div`
    font-style: italic;
    color: #666;
    font-size: 12px;
`;

const Black = styled.span`
    color: #000;
`;

const PopularPlaylist = (props: {
    index: number;
    title: string;
    id: number;
    creator: UserType;
}) => (
    <Playlist to={`/playlist/${props.id}`}>
        <Place>{props.index + 1}</Place>
        <Square>
            <Title>{props.title}</Title>
            <Created>
                created by <Black>{props.creator.name}</Black>
            </Created>
        </Square>
    </Playlist>
);

export default PopularPlaylist;
