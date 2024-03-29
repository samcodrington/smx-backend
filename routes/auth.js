const router = require('express').Router();
const passport = require('passport');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/*
Important Note regarding Cookies:
Please ensure that you do not login with a connect.sid cookie that corresponds to another valid active user as this appears to replace the user property.

While using postman, or a browser with multiple tabs for example, the cookies for requests are automatically updated throughout the application (browser or postman) so logging in with user a, sets the connect.sid cookie for the whole app to user a's cookie. If you do not wipe that cookie and login with user b (it will be set to user a's connect sid even in a different tab), what appears to happen is that user a's session data is replaced with user bs rather than seperate sessions being implemented.
*/
//Logging comments
router.use('*', function(req,res,next){
    console.log("Request made for " + req.url);
    console.log("Body is as follows" + JSON.stringify(req.body));
    console.log("Cookies as follows:" + JSON.stringify(req.cookies));
    next();
});

/* POST user login */
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      var mssg = {body: null};
        console.log("running custom auth");
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        mssg.body = info;
        return res.status(400).send(mssg);
      }
     //need to req.login manually
      req.login(user, loginErr => {
        if (loginErr) {
            mssg.body = "Bad Login - Error Logging In";
          return res.status(500).send(mssg);
        }
        return res.status(200).send(user);
      });      
    })(req,res,next)
});

router.post('/logout', function(req,res) {
    console.log("beginning logout");
    console.log(req.headers.cookie); //this is where cookie is checked!!
    if (req.user){
        console.log("User is logged out");
        req.logout();
        res.status(200).send('logged out!');
        /*req.session.destroy(function(err){
            res.status(200).send('logged out');
        });*/
    }
    else res.status(403).send('not logged in!');
});
/*This route returns either the user that is logged in or a 201 response that indicates no user is logged in.*/
//Login verification route.
router.get('/', function(req,res){
    //If no user logged in
    if (!req.user){
        res.status(201).send('No User logged in!');
    }
    //If a user is logged in return that user's information.
    else {
        res.status(200).send(req.user);
    }
});
module.exports = router;
