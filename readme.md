# Weather app backEnd
This is the repo for the weatherAPP backEnd, it uses express, needle, dotenv, apicache, nodemon and cors NPM packages. 

You can make calls to it [here](https://parzival-weather-api-server.herokuapp.com/api?q=) directly by adding a city name after the "=" sign on the URL.  

Just have in mind that there is a limit of 50 API calls every 10 minutes, which I set up to keep people from spamming. 

The API query result is store in cache for 3 minutes so, if you call the API within 3 minutes of the previous call you are going to get the data that is stored in your cache. 
