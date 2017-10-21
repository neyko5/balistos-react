import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

import SearchPlaylistContainer from './SearchPlaylistContainer';
import PopularPlaylistContainer from './PopularPlaylistContainer';
import Container from '../common/Container';
import backgroundImage from '../../img/back.png';
import noteIcon from '../../img/note-big.png';

const Background = styled.div`
  background: url(${backgroundImage}) repeat-x;
  background-position: 0 50px;
  min-height: 100%;
  height: auto;
  margin: -50px auto -45px;
  padding: 50px 0 45px;
  @media (min-width: 992px) {
      margin-top: 0;
  }
`

const Homeback = styled.div`
  background: #eaeaea;
  margin-top: 60px;
  margin-bottom: 60px;
  @media (min-width:320px) and (max-width:479px) {
    margin-top: 30px;
  }
`

const Presentation = styled.div`
  padding: 16px;
`;

const Popular = styled.div`
  border-top: #DCDCDC 3px solid;
  margin: 20px 0px;
  display: flex;
`

const PopularHeader = styled.h3`
  color: #000;
  font-weight: 600;
  font-size: 28px;
  display: inline-block;
  margin-left: 20px;
  line-height: 54px;
  margin: 0px;
  @media (min-width:320px) and (max-width:479px) {
    margin-left:5px;
    font-size:22px;
  }
`

const NoteIcon = styled.div`
  width: 54px;
  height: 54px;
  background: #adbf00 url(${noteIcon}) no-repeat 50%;
`

const SectionTitle = styled.h2`
  color: #758000;
  font-size: 34px;
  font-weight: 300;
  @media (min-width:320px) and (max-width:479px) {
        font-size: 21px;
  }
}
`

const Text = styled.div`
  margin-top: 20px;
  color: #333;
  font-size: 14px;
  @media (min-width:320px) and (max-width:479px) {
    font-size:12px;
  }
`
const MainTitle = styled.h1`
  font-size: 55px;
  width: 100%;
  color: #fff;
  font-weight: 200;
  text-align: center;
`

const Home = () => (
  <Background>
    <Container>
      <Box>
        <MainTitle>Share your music taste with your friends!</MainTitle>
        <SearchPlaylistContainer />
        <Homeback>
          <Flex wrap>
            <Box width={[1, 1, 1/2, 1/2]}>
              <Presentation>
                <SectionTitle>What is Balistos?</SectionTitle>
                <Text>Balistos is a simple application that uses the power of
                    YouTube to let you share your music taste with your friends or people with
                    the same ideas. Balistos lets you add music videos you like to the common
                    playlist, where all connected users can listen to them together and vote up
                    the ones they like.</Text>
              </Presentation>
            </Box>
            <Box width={[1, 1, 1/2, 1/2]}>
              <Presentation>
                <SectionTitle>How do I use Balistos?</SectionTitle>
                <Text>Simple! You may search all the playlists and select the one
                    you like by simply clicking on it. To be able to use full functionality of
                    Balistos such as adding songs and voting you are required to register an account.
                    If you don&apos;t like any of the playlist you may also create your own and share
                    it with your friends. If you want to make it exclusive for your friends, make
                    sure you protect it with password.</Text>
              </Presentation>
            </Box>
          </Flex>
          <Box width={1} px={2}>
            <Popular>
              <NoteIcon />
              <PopularHeader>Popular playlists</PopularHeader>
            </Popular>
          </Box>
          <PopularPlaylistContainer />
        </Homeback>
      </Box>
    </Container>
  </Background>
);
export default Home;
