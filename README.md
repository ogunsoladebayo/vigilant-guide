<h3 align="center">GraphQL API Test</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ogunsoladebayo/vigilant-guide.svg)](https://github.com/ogunsoladebayo/vigilant-guide/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ogunsoladebayo/vigilant-guide.svg)](https://github.com/ogunsoladebayo/vigilant-guide/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/)

</div>

---

<p align="center"> 🤖 This is a simple graphQL API that analyzes simple data
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Built Using](#built_using)
-   [Authors](#authors)

## 🧐 About <a name = "about"></a>

The goal is to create a graphQL API that will return data with these filters:

time: (period start date, end date) or per selected calendar month
selected pizza(s) or all pizza

The entire project is written mainly in TypeScript

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [Docker Compose](#docker-compose) for notes on how to run with docker-compose.

### Installing

-   Clone the repository
    > `git clone https://github.com/ogunsoladebayo/vigilant-guide.git`
-   change directory into the project folder
    > `cd vigilant-guide`
-   Install dependencies
    > `npm install`
-   Create a `.env` file in the root directory of the project and add the following environment variables
-  `MONGO_URI` - the URI to your MongoDB database
- Start the server
    > `npm run start:dev`

### Docker Compose

-   To run the application with docker-compose, run the following command
    > `docker-compose up -d`


### Testing

-   To run test cases, please install Jest and run...
    > `npm test`
    
## ⛏️ Built Using <a name = "built_using"></a>

-   [Node.js](https://nodejs.org/) - server side environment on which the application is built.
-   [TypeScript](https://www.typescriptlang.org/) - language used for the server side.
-   [Express.js](https://expressjs.com/) - web framework used for the server side.
-   [GraphQL](https://graphql.com/) -  Query language for the server side.
-   [MongoDB](https://www.mongodb.com/) - Database choice for application.

## ✍️ Authors <a name = "authors"></a>

-   [@ogunsoladebayo](https://github.com/ogunsoladebayo) - Initial work
