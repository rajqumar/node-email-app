const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
	const existingUser = User.findOne({googleId: profile.id});
		if(existingUser){
			console.log('User exists!!');
			return done(null, existingUser);
		}
	const user = new User({ googleId: profile.id}).save();
			return done(null, user);
		}
	)
);

// function getAlbums(){
// 	fetch('someapiurl')
// 	.then(res => res.json())
// 	.then(json => console.log(json))
// }