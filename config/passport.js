const passport = require('passport');
const LocalStrategy = require('passport-local');

var User = require('../models/user');

passport.use('login', new LocalStrategy({
        //if we want to change any defaults put them here
    },
    //Verify Callback function
    function(username, password, done){
        console.log('verify callback function fired!');
        console.log()
        User.findOne({username: username}, function (err, user){
            console.log(user);
            if (err) {
                console.log('error!');
                return done(err); }
            if (!user) {
                console.log('error! can\'t find user');
                return done(null, false);}
            if (user.password != password){
                console.log('error! wrong password');                
                return done(null, false);
            }
            console.log('found user');
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user,cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
   // db.User.
});