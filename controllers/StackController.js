const StackModel = require("../models/StackModel");
const StackController = {
	// Контроллер для получения списка всех технологий
	getAll: async (req, res) => {
		try {
			// Ищем все технологии в базе данных
			const stacks = await StackModel.find();
			// Отправляем ответ с массивом технологий
			res.json(stacks);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для получения одной технологии по ID
	getById: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем технологию по ID в базе данных
			const stack = await StackModel.findById(id);
			// Проверяем, что технология существует
			if (!stack) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Stack not found");
			}
			// Отправляем ответ с объектом технологии
			res.json(stack);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для создания новой технологии
	create: async (req, res) => {
		try {
			// Получаем данные из тела запроса
			const {title, imagePath, description, url, isUsuallyUsed} = req.body;
			// Проверяем, что все обязательные поля заполнены
			if (!title || !imagePath) {
				// Если нет, отправляем статус 400 и сообщение
				return res.status(400).send("Please provide title and imagePath");
			}
			// Создаем новый объект технологии на основе модели
			const stack = new StackModel({
				title,
				imagePath,
				description,
				url,
				isUsuallyUsed,
			});
			// Сохраняем объект в базе данных
			await stack.save();
			// Отправляем ответ со статусом 201 и объектом технологии
			res.status(201).json(stack);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для обновления существующей технологии по ID
	update: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Получаем данные из тела запроса
			const {title, imagePath, description, url, isUsuallyUsed} = req.body;
			// Проверяем, что хотя бы одно поле заполнено
			if (!title && !imagePath && !description && !url) {
				// Если нет, отправляем статус 400 и сообщение
				return res
					.status(400)
					.send("Please provide at least one field to update");
			}
			// Ищем технологию по ID в базе данных
			const stack = await StackModel.findById(id);
			// Проверяем, что технология существует
			if (!stack) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Stack not found");
			}
			// Обновляем поля технологии, если они переданы в запросе
			if (title) stack.title = title;
			if (imagePath) stack.imagePath = imagePath;
			if (description) stack.description = description;
			if (url) stack.url = url;
			if (url) stack.isUsuallyUsed = isUsuallyUsed;
			// Сохраняем обновленный объект в базе данных
			await stack.save();
			// Отправляем ответ с объектом технологии
			res.json(stack);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для удаления существующей технологии по ID
	delete: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем технологию по ID в базе данных
			const stack = await StackModel.findById(id);
			// Проверяем, что технология существует
			if (!stack) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Stack not found");
			}
			// Удаляем объект из базы данных
			await stack.remove();
			// Отправляем ответ со статусом 204 и без тела
			res.status(204).end();
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
};
module.exports = StackController;