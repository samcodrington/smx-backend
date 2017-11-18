const router = require('express').Router();

router.post('/login', (req,res) => {
    console.log('accessing login');
    
    //res.render('logged in'); 
    //^--throws error due to lack of views engine
});

router.post('/logout', (req,res) => {
    //res.send('logged out');
});
module.exports = router;
