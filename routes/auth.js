const router = require('express').Router();
const passport = require('passport');
/*
Important Note regarding Cookies:
Please ensure that you do not login with a connect.sid cookie that corresponds to another valid active user as this appears to replace the user property.

While using postman, or a browser with multiple tabs for example, the cookies for requests are automatically updated throughout the application (browser or postman) so logging in with user a, sets the connect.sid cookie for the whole app to user a's cookie. If you do not wipe that cookie and login with user b (it will be set to user a's connect sid even in a different tab), what appears to happen is that user a's session data is replaced with user bs rather than seperate sessions being implemented.
*/
router.post('/login', passport.authenticate('login'),
    function(req,res){
        console.log('accessing login');
        //console.log(res.req.headers.cookie); //this is where cookie is returned.
        res.status(200).send(req.user);
});

router.post('/logout', function(req,res) {
    console.log("beginning logout");
    //console.log(req.headers.cookie); //this is where cookie is checked!!
    if (req.user){
        console.log("User is logged out");
        req.logout();
        res.status(200).send('logged out!');
        /*req.session.destroy(function(err){
            res.status(200).send('logged out');
        });*/
    }
    else res.status(404).send('not logged in!');
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
