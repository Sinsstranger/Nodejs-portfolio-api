// Подключаем mongoose
const mongoose = require("mongoose");

// Определяем схему для стека технологий
const stackSchema = new mongoose.Schema({
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
				return /\.(jpe?g|png|gif|webp|svg)$/.test(v);
			},
			message: "Неверный формат изображения",
		},
	},
	description: {
		// Добавляем поле для описания технологии
		type: String,
		maxlength: 200, // Ограничиваем максимальную длину описания
	},
	url: {
		// Добавляем поле для ссылки на технологию
		type: String,
		validate: {
			// Пользовательский валидатор для проверки формата ссылки
			validator: function (v) {
				return /^https?:\/\/[\w-\.]+(\.[\w-]+)+\/?/.test(v);
			},
			message: "Неверный формат ссылки",
		},
	},
	isUsuallyUsed: {
		type: Boolean,
		required: false, // Не обязательное поле
	}
});

// Создаем модель для стека технологий на основе схемы
const StackModel = mongoose.model("StackModel", stackSchema);

// Экспортируем модель
module.exports = StackModel;
