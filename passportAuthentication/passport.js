const passport = require('passport');
const db = require('../models');
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.findOne({
        where: {
            id
        },
        raw: true
    })
    .then((user) => {
        done(null, user)
    })
    .catch((error) => {
        done(error, null)
    })
});

// Import all our strategies
const twitterStrategy = require('./twitterStrategy');


// Configure our strategies
passport.use('twitter', twitterStrategy);

module.exports = passport;