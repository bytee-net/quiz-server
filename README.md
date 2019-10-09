# Bytee Quiz node.js server

[![Build Status](https://travis-ci.org/bytee-net/quiz-server.svg?branch=master)](https://travis-ci.org/bytee-net/quiz-server)

Simple node express server for the [Vue.js Quiz app](https://github.com/bytee-net/quiz) using mongodb.

### Project setup

Install dependencies first.

```
npm install
```

Copy the `config.sample.js` to `config.js` and adjust the settings to your environment.

### Start the server (port 3000 by default)

```
npm start
```

### Run the API tests

> Make sure the quiz server is running and adjust the `test/config.js` file.

```
npm test
```

### Import Questions

You can use the `import.js` script to import JSON question files into your mongo database. 

```bash
node import.js path/to/questions.js
```
