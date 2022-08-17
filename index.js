const express = require('express')
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000
const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 minutes window
  // 50 calls in the time window
  max: 50,
});
app.use(limiter);
app.set('trust proxy', 1);

//Routes
app.use('/api', require('./routes/openWeather'));

let corsOptions = {
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Enable cors
app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))