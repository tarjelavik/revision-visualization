# Revision-Networks

This repo contains code and documentation for the visualization component of the Revision project. The app is built with Node.js, Express and React. It fetches data from the Birgitta-endpoint at https://sparql.birgitta.uib.no/birgitta-revision/query.


## How to run
`git clone git@git.app.uib.no:revision/revision-visualization.git` and then `cd revision-visualization`


## Available scripts

### `npm run install:server`
- Installs npm dependencies for the server

### `npm run install:client`
- Installs npm dependencies for the client

### `npm run install:All`
- Installs npm dependencies for the server and the client

### `npm run build:server`
- Compiles the Typescript files and serves them to the `dist` folder

### `npm run build:client`
- Builds and creates an optimized production build to the `client/build` folder used for serving in production

### `npm run start:dev:server`
- Starts nodemon which enables watch function for server files

### `npm run start:dev:client`
- Starts React which supports hot reload OOTB

## Pre-commit hooks
The following commands are automatically run before commits to version control. This can be omitted by adding the `-n` flag after your commit message.

### `lint`
- eslint runs on the project. If the linter finds problems, you can try to automatically fix them by running `npm run fix`

### `test`
- The Jest test suite runs

