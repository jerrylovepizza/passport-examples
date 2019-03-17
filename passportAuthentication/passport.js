const passport = require('passport');
const connection = require('../connection');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query('SELECT * FROM User WHERE id = ?', [id], (err, users) => {
        if (err) {
            return done(err, null);
        }
        const user = users[0];
        return done(null, user);
    });
});

// Import all our strategies
const googleStrategy = require('./googleStrategy');


// Configure our strategies
passport.use('google', googleStrategy);

module.exports = passport;