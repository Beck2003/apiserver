const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get(
    'google/callback',
    passport.authenticate('google', {
        successRedirect: '/displayUserDetails',
        failureRedirect: '/'
    })
);

module.exports = authRouter;