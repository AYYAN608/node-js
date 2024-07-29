require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/User'); // Ensure the path and filename are correct

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/nodejs-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    User.findById(payload.id).then(user => done(null, user)).catch(err => done(err));
}));

// Routes
app.use('/auth', require('./routes/auth')); // Ensure the path and filename are correct
app.use('/items', passport.authenticate('jwt', { session: false }), require('./routes/items')); // Ensure the path and filename are correct
app.use('/dashboard', passport.authenticate('jwt', { session: false }), require('./routes/dashboard')); // Ensure the path and filename are correct
app.use('/comments', require('./routes/comments')); // Ensure the path and filename are correct

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
