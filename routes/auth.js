const router = require('express').Router();
const passport = require('passport');

router.post('/login', passport.authenticate('login'),
    function(req,res){
        console.log('accessing login');
        console.log('got user: '+ req.user);
    //res.render('logged in'); 
    //^--throws error due to lack of views engine
});

router.post('/logout', function(req,res) {
    req.logout();
    //res.send('logged out');
});
module.exports = router;
