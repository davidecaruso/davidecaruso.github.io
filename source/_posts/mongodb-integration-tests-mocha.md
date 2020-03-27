---
title: MongoDB integration tests with Mocha
date: 2020-03-26 18:04:32
tags:
  - typescript
  - mocha
  - chai
  - nodejs
  - mongodb
  - testing
---

This guide helps you to run integration tests – and feature tests as well – in a Node.js application.

## Assumptions
This methodology was tested in a Node.js application written in TypeScript, which makes use of [mongoose](https://mongoosejs.com/) for the MongoDB connection and [Mocha](https://mochajs.org/) + [chai](https://www.chaijs.com/) for tests.

The code does not use TypeScript features – except for library import method, so you can use it also in a vanilla Node.js codebase.

## Mocker middleware
The first step is to create our *createDatabase* middleware.

Note that the connection uri to the MongoDB database comes from an environment variable called **MONGODB_DATABASE** in the *.env* file. 

<script src="https://gist.github.com/davidecaruso/11cdc338e6641905c5f811488b3e695d.js"></script>

The *connect* function creates a connection to the same uri string BUT with the **Test** suffix. This will create a *mock* database. This function is called before the first test – *before* hook.

The *clear* function drops the database, so the next test will have an empty database. This run after each test – *afterEach* hook. 
  
The *close* function closes definitely the connection with the database and is run after the last test – *after* hook.

## Using it in tests
As mentioned before, the script uses three [Mocha hooks](https://mochajs.org/#hooks), that because it receives them and the test suite itself as arguments.

So create the test passing those hooks as first arguments and entire test block as the callback function argument of the middleware.
<script src="https://gist.github.com/davidecaruso/ee6a855327949f83ab1d2d52ad933583.js"></script>

<br><br>Bye.
