const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;
const UserModel = require('../../models/UserModel');
require('dotenv').config();

passport.use(
	'local',
	new LocalStrategy({ usernameField: 'email' }, async (email, password, cb) => {
		try {
			const user = await UserModel.findOne({ email });

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
	}),
	new JwtStrategy(
		{
			jwtFromRequest: JwtExtract.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SIGN_KEY,
		},
		function jwtStrategy(jwtPayload, done) {
			UserModel.findOne({ id: jwtPayload.sub }, function cb(err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				}
				return done(null, false);
				// or you could create a new account
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

module.exports = passport;
