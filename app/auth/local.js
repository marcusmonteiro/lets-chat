'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

function Local(options) {
    this.options = options;
    this.key = 'local';
}

Local.key = 'local';

Local.prototype.setup = function() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(identifier, password, done) {
        var User = mongoose.model('User');
        User.authenticate(identifier, password, function(err, user) {
            if (err) {
                return done(null, false, {
                    message: 'Alguns campos não validaram.'
                });
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, null, {
                    message: 'Credenciais de login incorretas.'
                });
            }
        });
    }));
};

Local.prototype.authenticate = function(req, cb) {
    passport.authenticate('local', cb)(req);
};

module.exports = Local;
