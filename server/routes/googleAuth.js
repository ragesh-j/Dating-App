const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/registration' }),
  (req, res) => {
    console.log(req.user)
    res.redirect('/');
  }
);


router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'User is authenticated', user: req.user });
  } else {
    res.status(401).json({ message: 'User is not authenticated' });
  }
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;