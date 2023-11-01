// Подключаем mongoose
const mongoose = require("mongoose");

// Определяем схему для списка проектов
const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true, // Обязательное поле
	},
	imagePath: {
		type: String,
		required: true, // Обязательное поле
		validate: {
			// Пользовательский валидатор для проверки формата изображения
			validator: function (v) {
				return /\.(jpg|jpeg|png|gif)$/.test(v);
			},
			message: "Неверный формат изображения",
		},
	},
	description: {
		// Поле для описания проекта
		type: String,
		maxlength: 200, // Ограничиваем максимальную длину описания
	},
	url: {
		// Поле для ссылки на проект
		type: String,
		validate: {
			// Пользовательский валидатор для проверки формата ссылки
			validator: function (v) {
				return /^https?:\/\/[\w-\.]+(\.[\w-]+)+\/?/.test(v);
			},
			message: "Неверный формат ссылки",
		},
	},
	category: {
		// Поле для типа проекта
		type: String,
		enum: ["Web", "Mobile", "Game"], // Ограничиваем возможные значения
	},
	technologies: [
		{
			// Поле для технологий, используемых в проекте
			type: String,
		},
	],
	status: {
		// Поле для состояния проекта
		type: String,
		enum: ["Completed", "In progress", "Frozen"], // Ограничиваем возможные значения
	},
});

// Создаем модель для списка проектов на основе схемы
const ProjectModel = mongoose.model("ProjectModel", projectSchema);

// Экспортируем модель
module.exports = ProjectModel;
