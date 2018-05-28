<div align="center" markdown="1">

  
  # Simple API server   <img width="105px" height="55px" src="https://jazzteam.org/en/wp-content/uploads/2017/02/api-icon.png">
  
  **v. 1.0.0**
    
  [Change log](CHANGES.md)

</div>

# Features
 
## Backend
- mongodb ( please make sure you got it install on default port or change in config file )
- swagger api `http://localhost:3002`
- dictionary check as api endpoint ( dictionary.txt included and will load into mongodb on first load, please don't interrupt the first launch )
- unit tests ( jest, sinon, chai )
- eslint, codeclimate, circleci

# Quick start guide

## Starting up the client
Mongodb and node.js are required. 

My current node version is: 7.7.3, if any issues please fall back to it.

1. `npm install`
2. `npm start`

## Run unit tests

`npm run start:tests`

`npm run start:tests:watch`

# Structure overview

- bin/
  - api/ - swagger api definition and api endpoints
  - config/
  - core/ - framework core files sharable between applications
  - modules/
- test - unit tests and e2e tests configs

