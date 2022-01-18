var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 360000000 });
};
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
///
exports.verifyUser = passport.authenticate('jwt', { session: false });




passport.use('facebook',new FacebookStrategy({
 clientID: "482817442994187",
 clientSecret: "e304202a1f4411863b6ba250c947a0be",
 },
 async (accessToken, refreshToken, profile, done)=> {
//  User.findOrCreate(..., function(err, user) {
//  if (err) { return done(err); }
//  done(null, user);
//  });
    try{
        console.log('profile',profile);
        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken)
    }
    catch(error){
   //     done(error,null);

    }
 }
));








exports.verifyAdmin = (req, res, next) => {
    console.log(req.user._id);    
    User.findOne({ _id: req.user._id }, (err, user) => {
        console.log(user.admin);
        if (err) {
            return next(err);
        } else if (user.admin) {
            return next();
        } else {
            res.send("You are not allowed to perform this operation");
        }
    });
};

exports.verifyDoctor = (req, res, next) => {
    console.log(req.user._id);    
    User.findOne({ _id: req.user._id }, (err, user) => {
        console.log(user.doctor);
        if (err) {
            return next(err);
        } else if (user.doctor) {
            return next();
        } else {
            res.send("You are not allowed to perform this operation");
        }
    });
};
