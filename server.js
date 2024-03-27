const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { join } = require('path');
const session = require('express-session');

const stackRoutes = require('./routes/stackRoutes');
const projectRoutes = require('./routes/projectRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authRoutes = require('./routes/AuthRoutes');
const passport = require('./config/passport/passport');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(express.static('views'));
app.use(
	session({
		secret: 'sd4535',
		resave: true,
		saveUninitialized: false,
	})
);

app.use(passport.session({}));
app.use(passport.initialize({}));

app.set('view engine', 'ejs');
app.set('view cache', false);
app.set('views', join(__dirname, './views'));

app.use('/api/stack', stackRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	res.render('pages/index');
});
app.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	return res.render('pages/login');
});
const run = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		process.exit(1);
	}

	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server running on port ${port}`);
	});
};
run();
