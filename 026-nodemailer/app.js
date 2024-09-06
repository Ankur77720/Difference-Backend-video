require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sendEmail = require('./services/email');

const app = express();


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {

        console.log('profile:', profile);


        return done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => {

    sendEmail(
        'ankursingh77720@gmail.com',
        'Test Email Subject',
        'This is a test email sent with Nodemailer using OAuth2.',
        '<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>'
    );

    res.send(`
        <h1>Home</h1>
        <a href="/auth/google">Login with Google</a>
        `);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'profile', 'email' ] })
);

app.get('/auth/google/callback',
    (req, res, next) => {
        console.log(req.query);
        return next();
    },
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {


    res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})