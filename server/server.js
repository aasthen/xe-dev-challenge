const express = require('express');
const cors = require('cors')
const axios = require('axios');
const apicache = require('apicache');

// read URL from a json config file
const config = require('./config.json');

// start the express server
const app = express();

// Enable cors
app.use(cors());

// Register the cache middleware for GET and OPTIONS of autocomplete endpoint
app.get('/autocomplete', cacheMiddleware());
app.options('/autocomplete', cacheMiddleware());

// register endpoint autocomple
app.get('/autocomplete', (req, res) => {

    const input = req.query.input;
    if( input == undefined || input.length === 0) {
        res.status(400).send({ error: 'No input param is provided' });
    }
    else
    {
        console.log("Fetching data from autocomplete api for input: " + input);

        const url = config.autocompleteUrl + '?input=' + encodeURIComponent(input);

        // fetch data using axios and return them as the response
        axios.get(url).then(resp => {
    
            res.send(resp.data);
        }).catch( error => {
                console.log("Error : " + error.response);
                if(error.response.status === 400)
                {
                    console.log("Error : Empty input string provided");
                }
                else if(error.response.status === 403)
                {

                }
                else
                {

                }
            }
        );
    }

});
app.listen(8080);

// caching middleware for each api requests
function cacheMiddleware() {
    const cacheOptions = {
        statusCodes: { include: [200] },
        defaultDuration: 60000,
        appendKey: (req, res) => req.method
    };
    let cacheMiddleware = apicache.options(cacheOptions).middleware();
    return cacheMiddleware;
}