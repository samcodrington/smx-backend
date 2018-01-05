const router = require('express').Router();
const passport = require('passport');

router.post('/login', passport.authenticate('login'),
    function(req,res){
        console.log('accessing login');
        //console.log(res.req.headers.cookie); //this is where cookie is returned.
        res.status(200).send('Logged in');
});

router.post('/logout', function(req,res) {
    console.log("beginning logout");
    //console.log(req.headers.cookie); //this is where cookie is checked!!
    if (req.user){
        console.log("User is logged out");
        req.logout();
        req.session.destroy(function(err){
            res.status(200).send('logged out');
        });
    }
    else res.status(404).send('not logged in!');
});
module.exports = router;
