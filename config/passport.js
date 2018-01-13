const passport = require('passport');
const LocalStrategy = require('passport-local');

var User = require('../models/userSchema');

passport.use('login', new LocalStrategy({
        //if we want to change any defaults put them here
    },
    //Verify Callback function
    function(username, password, done){
        User.findOne({username: username}, function (err, user){
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
    console.log('Serializing User!');
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    console.log('Deserializing User!');
    console.log('User ID is:' + id);
    User.findOne({_id: id}).then((user) => {
        done(null, user.id);
    })
});
