const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../models/UserModel');

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
	})
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

module.exports = passport;
