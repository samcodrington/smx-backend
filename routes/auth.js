const router = require('express').Router();

router.get('login', (req,res) => {
    res.send('logged in');
});

router.get('logout', (req,res) => {
    res.send('logged out');
});
module.exports = router;
