# Democratic Lunch
Website for managing a poll of lunch options. 

## Features

* User Authentication using JSON Web Tokens
* Visualization of poll results as well as results from the current week
* Mobile friendly interface
* Users can change their vote, triggering the exclusion of their previous choice and registering the new option
* After the user has logged in, their vote will be displayed on the poll
* Users cannot enter options that have already been chosen as the winner in the week

## Implementation Details

* RESTful API using NodeJS that validates all information before entering it on the MongoDB database
* User authentication using Passport and JSON Web Tokens
* Frontend developed in Angular with Angular Material for displaying interface elements
* Automated tests
* Poll results are shown using the Chart.js library

## How to run it locally

### Environment

* Angular 9.1.12
* NodeJS 12.16.1
* MongoDB shell version 4.2.8

### Build

You must open **three** terminal windows, following the instructions below:

1. In the "mongodb" folder, open a command line and use the following commands:

  `mongorestore --db lunchPicker dump/lunchPicker`

  `mongod --dbpath=data --bindip 127.0.0.1`
  
2. In the "backend" folder, open a command line and use the following commands:

`npm install`

`npm start`

3. In the "frontend" folder, open a command line and use the following commands:

`npm install`

`npm start`

4. Enter 'localhost:4200' in your browser
5. You can run the automated tests using the command `ng test`


