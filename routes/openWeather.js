const url = require('url');
const express = require('express');
const router = express.Router();
// for request 
const needle = require('needle');
const apicache = require('apicache')


// Enviroment Variables
const OPEN_WEATHER_URL = process.env.OPEN_WEATHER_REQUEST_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// save the previous api call data on cache.
// a 3 minute timer is set on the router. 
let cache = apicache.middleware


router.get('/', cache('3 minutes'), async (req, res) => {
  try {
    //this allows us to call the app hosted on Heroku from local host
    res.setHeader('Access-Control-Allow-Origin', 'https://parzivalcen.github.io/weatherApp/');
    // URL Params
    // Takes an obj of parameters that we want to add
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      // spread the parameter that is passed on the URL
      ...url.parse(req.url, true).query
    })

    const apiRes = await needle('get', `${OPEN_WEATHER_URL}?${params}`);
    const data = apiRes.body;
    // Show(log) request when not in production
    if(process.env.NODE_ENV !== 'production'){
      console.log(`REQUEST: ${OPEN_WEATHER_URL}?${params}`)
    }


    res.status(200).json(data);
  } catch (error) {
    // interna server error
    res.status(500).json({error});
  }
})


module.exports=router