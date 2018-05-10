const express = require('express');
require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);

//refer here https://github.com/mstade/passport-google-oauth2
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
})