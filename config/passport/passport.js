const passport = require('passport');
const UserModel = require('../../models/UserModel');
const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SIGN_KEY || 'secret';

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async function (email, password, cb) {
  try {
    const user = await UserModel.findOne({ email: email });
    
    if (!user) {
      return cb(null, false, { message: 'Неверный логин' });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return cb(null, false, { message: 'Неверный пароль' });
    }

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, cb) {
// 	UserModel.findById(jwt_payload.id, function (err, user) {
// 		if (err) {
// 			return cb(err);
// 		}
// 		if (!user) {
// 			return cb(null, false, {message: 'Неверный токен'});
// 		}
// 		return cb(null, user);
// 	});
// }));

module.exports = passport;
