const ProjectModel = require('../models/ProjectModel');
const projectController = {
	// Контроллер для получения списка всех проектов
	getAll: async (req, res) => {
		try {
			// Ищем все проекты в базе данных
			const projects = await ProjectModel.find();
			// Отправляем ответ с массивом проектов
			res.json(projects);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send('Server error');
		}
	},
	// Контроллер для получения одного проекта по ID
	getById: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем проект по ID в базе данных
			const project = await ProjectModel.findById(id);
			// Проверяем, что проект существует
			if (!project) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send('Project not found');
			}
			// Отправляем ответ с объектом проекта
			res.json(project);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send('Server error');
		}
	},
	// Контроллер для создания нового проекта
	create: async (req, res) => {
		try {
			// Получаем данные из тела запроса
			const {title, imagePath, description, url, category, technologies, status} = req.body;
			// Проверяем, что все обязательные поля заполнены
			if (!title || !imagePath || !category || !status) {
				// Если нет, отправляем статус 400 и сообщение
				return res.status(400).send('Please provide title, imagePath, category and status');
			}
			// Создаем новый объект проекта на основе модели
			const project = new ProjectModel({
				title,
				imagePath,
				description,
				url,
				category,
				technologies,
				status
			});
			// Сохраняем объект в базе данных
			await project.save();
			// Отправляем ответ со статусом 201 и объектом проекта
			res.status(201).json(project);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send('Server error');
		}
	},
	// Контроллер для обновления существующего проекта по ID
	update: async (req, res) => {
		try {
			const id = req.params.id;
			const updateFields = req.body.filter(Boolean);
			if (Object.keys(updateFields).length === 0) {
				return res.status(400).send('Please provide at least one field to update');
			}
			// TODO: Сделано под Метод PUT, подумать о модификации под PUT / PATCH
			const project = await ProjectModel.findByIdAndUpdate(id, updateFields, {
				new: true,
			});

			if (!project) {
				return res.status(404).send('Project not found');
			}

			res.json(project);
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
	// Контроллер для удаления существующего проекта по ID
	delete: async (req, res) => {
		try {
			// Получаем ID из параметров запроса
			const id = req.params.id;
			// Ищем проект по ID в базе данных
			const project = await ProjectModel.findById(id);
			// Проверяем, что проект существует
			if (!project) {
				// Если нет, отправляем статус 404 и сообщение
				return res.status(404).send("Project not found");
			}
			// Удаляем объект из базы данных
			await project.remove();
			// Отправляем ответ со статусом 204 и без тела
			res.status(204).end();
		} catch (err) {
			// Обрабатываем ошибку и отправляем статус 500
			console.error(err);
			res.status(500).send("Server error");
		}
	},
}
module.exports = projectController;