const express = require('express');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth.routes');
const passportConfig = require('./config/passport.config');

const app = express();

configureServer();
createRoutes();

app.listen(3000, () => {
    console.log('port 3000');
});