const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: '430854954020-08rj72apfd0abj32a8olc27hbfs122kj.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: 'http://localhost:3000/auth/google/callback',
            }, 
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
            }
        )
    );

    passport.serializeUser((profile, done) => {
        done(null, profile);
    });

    passport.deserializeUser((profile, done) => {
        done(null, profile);
    });
};