const passport = require('passport')
const UserModel = require('../../models/UserModel')
const LocalStrategy = require('passport-local').Strategy

passport.use(
	'local',
	new LocalStrategy({ usernameField: 'email' }, async function (
		email,
		password,
		cb
	) {
		try {
			const user = await UserModel.findOne({ email: email })

			if (!user) {
				return cb(null, false, { message: 'Неверный логин' })
			}

			const isPasswordValid = await user.comparePassword(password)

			if (!isPasswordValid) {
				return cb(null, false, { message: 'Неверный пароль' })
			}

			return cb(null, user)
		} catch (err) {
			return cb(err)
		}
	})
)

passport.serializeUser(function (user, done) {
	done(null, user)
})

passport.deserializeUser(function (user, done) {
	done(null, user)
})

module.exports = passport
