const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
	}
));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//refer here https://github.com/mstade/passport-google-oauth2
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
})