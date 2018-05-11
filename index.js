const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);

//refer here https://github.com/mstade/passport-google-oauth2
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
})