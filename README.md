# NC-NEWS

NC-NEWS is a news website which holds articles, topics, comments and users within it. You are also able to interact with the site such as post your own comments and like certain articles and comments, and much more!

This current repo is an API which holds data which will be used by my front end. Please click the hosted version here (https://nc-news-web.herokuapp.com/api/) to be presented with a list of endpoints that the back end/ this current repo holds.

## RUNNING THE PROJECT LOCALLY

1. fork this repository

2. clone the project from Github

3. cd into the project folder

4. npm install

5. npm run start to open the project on the browser, this will run on localhost:9090

or

5. npm run test to run the test suite

6. npm run setup:dbs

7. npm run seed:run

8. To stop running the server user use ctrl + c

## Prerequisites

In order to get the development enviroment running you will need to install several dependicies:

- express v4.16
- fs v0.0.1
- knex v0.16
- pg v7.11
- cors v2.8
- PostgreSQL v11

e.g. npm i express

Next you will need to install severale dev dependicies, remember the -D:

- chai v4.2
- chai-sorted v0.2
- mocha v6.1
- nodemon v1.19
- supertest v4.0

e.g. npm i supertest -D

You will also need to create a knexfile.js which will contain your configuration settings. This file should contain the following:

```javascript
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "nc_news"
      username: "",
      password: "",
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      username: "",
      password: "",
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };


```

## Built with

- Express.js - Back-end Framework
- Knex.js - Query builder for SQL based databases
- postgreSQL - Object-relational database management system
- Testing:
- Mocha
- Chai

## Authors

Tarik Medjber - NC-NEWS backend
