import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Dispatch } from "redux";
import styled, {createGlobalStyle} from "styled-components";

import { closeAllWindows, setAuthFromStorage } from "../../actions";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Playlist from "../Main/Playlist";

const Global = createGlobalStyle`
*{
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}
h1,h2,h3,h4 {
  margin: 0px;
}

header,
main,
nav,
section {
  display: block;
}


[hidden],
template {
  display: none;
}

a {
  background-color: transparent;
}

a:active,
a:hover {
  outline: 0;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

img {
  border: 0;
}

svg:not(:root) {
  overflow: hidden;
}

button,
input,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}


button {
  overflow: visible;
  border: none;
  background: transparent;
}

button,
select {
  text-transform: none;
}

button,
html input[type="button"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}

button[disabled],
html input[disabled] {
  cursor: default;
}


button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input {
  line-height: normal;
}

textarea {
  overflow: auto;
}

html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Open Sans";
  background: white;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #ffffff;
}
::-webkit-scrollbar-track {
  width: 5px;
  height: 5px;
  background: #ffffff;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
`;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
  setAuthFromStorage: () => {
    dispatch(setAuthFromStorage());
  },
});

const FullHeight = styled.div`
  height: 100%;
`;

const App = (props: {
  clickOutside: () => void,
  setAuthFromStorage: () => void,
}) => {
  useEffect(() => {
    props.setAuthFromStorage();
  }, []);
  return (
  <BrowserRouter>
    <FullHeight onClick={props.clickOutside}>
      <Global />
      <Header />
      <Route exact={true} path="/" component={Home} />
      <Route path="/playlist/:playlistId" component={Playlist} />
    </FullHeight>
  </BrowserRouter>
); };

export default connect(undefined, mapDispatchToProps)(App);
