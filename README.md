# Balistos

Balistos is music sharing app which uses power of YouTube to create collaborative playlist where users can add, vote and listen to videos in real time. You can find the app deployed at [Balistos.com](https://www.balistos.com).

# Balistos React
This repository holds front end for Balistos, YouTube playlist sharing app. 
This app has a API backend counterpart written in Express.js framework.
You can find it at [Balistos GitHub repository](https://github.com/neyko5/balistos).

This app uses:

* React
* Redux
* Redux Saga
* Socket.io
* JWT tokens
* Webpack
* Babel
* Less
* YouTube API

To use this app, follow these steps:

1. Clone and run Balistos API.
2. Install webpack globally with node command '**npm install webpack webpack-dev-server -g**' .
3. Run node command '**npm install**' to install all necessary node.js modules.
4. Change API_INDEX to '***http://localhost:4000***' in the index.jsx file.
5. Run app with '**npm run start**'. App will by default start listening to port 3000.