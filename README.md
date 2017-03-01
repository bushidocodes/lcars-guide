# LCARS Guide

LCARS Guide is the ultimate platform for fans of Star Trek TNG to engage with the content they love.

## Installation

To install LCARS Guide on your computer, you will need [Node.js with NPM](https://nodejs.org/en/download/)

Once you have Node.js with NPM, clong the repo to a local directory and install the app's dependencies

```
git clone https://github.com/spmcbride1201/borg-no-more.git
npm install
```

To start the app in dev mode (hot-module reloading):
```
npm run dev
```
... and then open http://localhost:8080/public in a browser

To start the app in test mode (hot-module reloading):
```
npm run test
```
... and then open http://localhost:7777/tests/ in a browser

To build for production (inject CSS into bundle, uglify, perform dependency tree shaking):
```
npm run build
```
... and then locally open ./public/index.html in a browser

## Built with love using:
* NPM to `npm install` all the things and run scripts
* Babel + Webpack for build pipeline and hotreloading
* Mocha + Chai + Enzyme + Sinon for testing
* React + React-Router + Redux for Application UI logic and state
