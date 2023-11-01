const passport = require('passport');

// Middleware для проверки наличия токена в заголовке запроса
exports.checkToken = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(403).json({
			message: 'Токен не предоставлен'
		});
	}
	next();
};

// Middleware для проверки валидности токена и аутентификации пользователя
exports.authenticateUser = (req, res, next) => {
	passport.authenticate('jwt', {session: false}, (err, user, info) => {
		if (err || !user) {
			return res.status(401).json({
				message: info ? info.message : 'Неверный токен'
			});
		}
		req.user = user;
		next();
	})(req, res, next);
};

// Middleware для проверки роли пользователя
exports.authorizeUser = (roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				message: 'У вас недостаточно прав для выполнения этого действия'
			});
		}
		next();
	};
};