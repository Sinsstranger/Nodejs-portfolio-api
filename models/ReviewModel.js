// Подключаем mongoose
const mongoose = require("mongoose");

// Определяем схему отзывов
const reviewSchema = new mongoose.Schema({
	author: {
		name: {
			type: String,
			required: true, // Добавляем валидацию для имени автора
		},
		position: String,
		avatarPath: {
			type: String,
			required: true, // Добавляем валидацию для пути к аватару
		},
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		// Добавляем поле для даты создания отзыва
		type: Date,
		default: Date.now, // Устанавливаем значение по умолчанию
	},
});
const ReviewModel = mongoose.model("ReviewModel", reviewSchema);
module.exports = ReviewModel;
