const passport = require('passport');

module.exports = app => {

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', function(req, res){
		req.logout();
		//req.user doesn't shows because the user id is killed after logged out
		res.send(req.user);
	});

	app.get('/api/current_user', function(req, res){
		res.send(req.user);
	});

};