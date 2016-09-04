var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

var User = require('../models/user');
var Token = require('../models/token');

module.exports = (passport) => {
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((_id, done) => {
        User.findById(_id, (err, user) => {
           done(err, user); 
        });
    });

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientId,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            //passReqToCallback : true,
            profileFields: configAuth.facebookAuth.profileFields,
            enableProof: true
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                var query = {
                    $or: [
                        {'facebook.id': profile.id},
                        {'email': (profile.emails[0].value || '').toLowerCase()}
                    ]
                }
                User.findOne(query, (err, user) => {
                    if(err) return done(err);                    
                    if(user) {
                        var query = {_id: user.id};
                        var updateQuery = {facebook:{id:profile.id, token:accessToken}};
                        User.update(query, updateQuery, (err) => {
                            if(err) throw err;
                            return done(null, user);
                        });
                    } else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;           
                        newUser.firstName = profile.name.givenName;
                        newUser.lastName = profile.name.familyName;
                        newUser.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.save((err) => {
                            if(err) throw err;
                            return done(null, newUser);
                        });
                    }                      

                });
            });
        }
    ));

}