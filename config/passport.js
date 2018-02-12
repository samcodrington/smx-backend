const passport = require('passport');
const LocalStrategy = require('passport-local');

var User = require('../models/userSchema');

passport.use('login', new LocalStrategy({
        //if we want to change any defaults put them here
    },
    //Verify Callback function
    function(username, password, done){
        User.findOne({username: username}, function (err, user){
            var mssg = null;
            if (err) {
                return done("Internal Error During Authentication Please try Again"); 
            } if (!user) {
                mssg = 'User does not exist in database';
                console.log(mssg);
                return done(err, false);
            } if (user.password != password){
                mssg = 'Password is Incorrect';
                console.log(mssg);
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
    }).catch( function(err){
      // need error handling
    console.log(err);
    console.log("Error user not found in DB");
    });
});
