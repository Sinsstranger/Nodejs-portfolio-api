/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const passport = require('../config/passport/passport');

const UserController = {
	// Создание и сохранение нового пользователя
	createUser: async (req, res) => {
		try {
			// Проверка наличия обязательных полей
			if (!req.body.login || !req.body.password || !req.body.email) {
				return res.status(400).json({
					message: 'Недостаточно данных для создания пользователя',
				});
			}
			// Проверка уникальности логина и email
			const existingUser = await UserModel.findOne({
				$or: [{ login: req.body.login }, { email: req.body.email }],
			});
			if (existingUser) {
				return res.status(409).json({
					message: 'Пользователь с таким логином или email уже существует',
				});
			}
			// Создание нового пользователя
			const user = new UserModel({
				login: req.body.login,
				password: req.body.password,
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			});
			// Сохранение пользователя в базе данных
			await user.save();
			return res.status(201).json({
				message: 'Пользователь успешно создан',
			});
		} catch (err) {
			return res.status(500).json({
				message: err.message || 'Произошла ошибка при создании пользователя',
			});
		}
	},
	// Аутентификация пользователя и генерация токена
	loginUser: (req, res, next) => {
		passport.authenticate('local', { session: true }, async (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (err || !user) {
				return res.status(401).json({
					message: info ? info.message : 'Неверный логин или пароль',
				});
			}

			return req.logIn(user, (error) => {
				if (err) {
					return next(error);
				}

				// console.log(req.session.passport.user);

				// Генерация токена
				const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SIGN_KEY, {
					expiresIn: process.env.JWT_TOKEN_LIFETIME,
				});
				// Отправка токена клиенту
				return res.status(200).json({
					message: 'Пользователь успешно аутентифицирован',
					token,
					role: user.role,
				});
			});
		})(req, res, next);
	},
	// Получение информации о текущем пользователе по токену
	getUserInfo: async (req, res) => {
		passport.authenticate('jwt', { session: false }, async (err, user, info) => {
			if (err || !user) {
				return res.status(401).json({
					message: info ? info.message : 'Неверный токен',
				});
			}
			// Отправка информации о пользователе клиенту
			return res.status(200).json(user);
		})(req, res);
	},
	// Обновление информации о текущем пользователе по токену
	updateUserInfo: async (req, res) => {
		passport.authenticate('jwt', { session: false }, async (err, user, info) => {
			if (err || !user) {
				return res.status(401).json({
					message: info ? info.message : 'Неверный токен',
				});
			}
			// Поиск и обновление пользователя по id из токена
			const updatedUser = await UserModel.findByIdAndUpdate(user._id, req.body, { new: true, runValidators: true });
			// Отправка обновленной информации о пользователе клиенту
			return res.status(200).json(updatedUser);
		})(req, res);
	},
	// Удаление текущего пользователя по токену
	deleteUser: async (req, res) => {
		passport.authenticate('jwt', { session: false }, async (err, user, info) => {
			if (err || !user) {
				return res.status(401).json({
					message: info ? info.message : 'Неверный токен',
				});
			}
			// Поиск и удаление пользователя по id из токена
			await UserModel.findByIdAndDelete(user._id);
			// Отправка сообщения об успешном удалении пользователя клиенту
			return res.status(200).json({
				message: 'Пользователь успешно удален',
			});
		})(req, res);
	},
};
module.exports = UserController;
