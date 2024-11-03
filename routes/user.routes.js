const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // go to the next middleware
    } else {
        res.redirect('/user/no-permission');
    }
};

router.get('/logged', isLogged, (req, res) => {
    res.render('logged', { userName: req.user.name.givenName, image: req.user._json.picture });
});

router.get('/profile', isLogged, (req, res) => {
    res.render("profile");
});

router.get('/profile/settings', isLogged, (req, res) => {
    res.render("settings");

});

router.get('/no-permission', (req, res) => {
    res.render('noPermission');
});


module.exports = router;