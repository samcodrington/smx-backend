const router = require('express').Router;

router.get('/login', (req,res)=> {
    res.render('Logged In!')
});