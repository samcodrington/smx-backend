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
                return done(err, false);}
            if (user.password != password){
                console.log('error! wrong password');                
                return done(err, false);
            }
            console.log('found user');
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user,done){
    console.log('Serializing User: ' + user);
    done(null, user.id);
});

passport.deserializeUser(function(id, cb){
    db.User.findByID(id).then((user) => {
        done(null, user.id);
    })
});