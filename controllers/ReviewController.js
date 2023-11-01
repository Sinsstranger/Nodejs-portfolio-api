const ReviewModel = require("../models/ReviewModel");
const reviewController = {
	// Контроллер для получения списка всех отзывов
	getAll: async (req, res) => {
		try {
			// Ищем все отзывы в базе данных
			const reviews = await ReviewModel.find();
			// Отправляем ответ с массивом отзывов
			res.json(reviews);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send('Server error');
		}
	},
	// Контроллер для получения одного отзыва по ID
	getById: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем отзыв по ID в базе данных
			const review = await ReviewModel.findById(id);
			// Проверяем, что отзыв существует
			if (!review) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send('Review not found');
			}
			// Отправляем ответ с объектом отзыва
			res.json(review);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send('Server error');
		}
	},
	// Контроллер для создания нового отзыва
	create: async (req, res) => {
		try {
			// Получаем данные из тела запроса
			const {author, title, description} = req.body;
			// Проверяем, что все обязательные поля заполнены
			if (!author || !title || !description) {
				// Если нет, отправляем статус 400 и сообщение
				return res.status(400).send('Please provide author, title and description');
			}
			// Создаем новый объект отзыва на основе модели
			const review = new ReviewModel({
				author,
				title,
				description
			});
			// Сохраняем объект в базе данных
			await review.save();
			// Отправляем ответ со статусом 201 и объектом отзыва
			res.status(201).json(review);
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
			const {author, title, description} = req.body;
			// Проверяем, что хотя бы одно поле заполнено
			if (!author && !title && !description) {
				// Если нет, отправляем статус 400 и сообщение
				return res
					.status(400)
					.send("Please provide at least one field to update");
			}
			// Ищем отзыв по ID в базе данных
			const review = await ReviewModel.findById(id);
			// Проверяем, что отзыв существует
			if (!review) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Review not found");
			}
			// Обновляем поля отзыва, если они переданы в запросе
			if (title) review.author = author;
			if (title) review.title = title;
			if (description) review.description = description;
			// Сохраняем обновленный объект в базе данных
			await review.save();
			// Отправляем ответ с объектом отзыва
			res.json(review);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для удаления существующего отзыва по ID
	delete: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем технологию по ID в базе данных
			const review = await ReviewModel.findById(id);
			// Проверяем, что отзыв существует
			if (!review) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Review not found");
			}
			// Удаляем объект из базы данных
			await review.remove();
			// Отправляем ответ со статусом 204 и без тела
			res.status(204).end();
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
}
module.exports = reviewController;