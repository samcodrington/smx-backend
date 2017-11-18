const router = require('express').Router();
const passport = require('passport');

router.post('/login', passport.authenticate('login'),
    function(req,res){
        console.log('accessing login');
        res.send(200, req.user);
    //res.render('logged in'); 
    //^--throws error due to lack of views engine
});

router.post('/logout', function(req,res) {
    if (req.user){
        req.logout();
        res.send(200, 'logged out');
    }
    else res.send(404, 'not logged in!');
        
    //res.send('logged out');
});
module.exports = router;
