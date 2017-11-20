const router = require('express').Router();
const passport = require('passport');

router.post('/login', passport.authenticate('login'),
    function(req,res){
        console.log('accessing login');
        console.log(req.session);
        res.status(200).send(req.user);
    //res.render('logged in'); 
    //^--throws error due to lack of views engine
});

router.post('/logout', function(req,res) {
    console.log("beginning logout" + req.session);
    if (req.user){
        console.log("User is logged in");
        req.logout();
        res.status(200).send('logged out');
    }
    else res.status(404).send('not logged in!');
        
    //res.send('logged out');
});
module.exports = router;
