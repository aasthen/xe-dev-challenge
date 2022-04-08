# xe-dev-challenge


## Getting Started 

The below project consists of two applications 
- **_Server_**. Handles the communication with the autocomplete API and also caches the api responses
- **_Site_**. Displays the stored properties to a connected firestore database. Also alows the addition of new properties. The form to add new property contains an autocomplete component (area field) that starts suggesting areas when the 3rd char is written. On success submission, a notification is displayed to the user and the main table is updated


## Technologies and packages used

**_Server_** application is written in **nodeJS**. It also makes use of the following packages:
- _express_, package to quickly setup a web application with endpoints (only one endpoint actually exists)
- _cors_, package to enable CORS on the response back
- _axios_, is a small http client to perform the get request
- _apicache_, is a package to handle the caching of the api responses

**_Site_** application is written in **reactJS**. It also makes use of the following packages:
- _axios_, is a small http client to perform the get request
- _material-ui_, package that provider ready to use react components
- _firestore_, is a cloud-hosted NoSQL database
- _react testing library_, is a very light-weight solution for testing React components

## How to run 

In the project's directory, there are two folders (site and server). On each of the folders run the following commands:
```
 > cd site
 > npm install
 > npm start
```

 (in separate terminal)
```
 > cd server
 > npm install
 > npm start
```

❕ *npm_install* is required only the first time used.

## How to test

The website contains unit test for the create components.
In order to run the test:
```
 > cd site
 > npm test
 ```