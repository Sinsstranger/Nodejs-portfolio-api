const express = require('express');
const app = express();
const mongoose = require('mongoose');
const stackRoutes = require('./routes/stackRoutes');
const projectRoutes = require('./routes/ProjectRoutes');
const reviewsRoutes = require('./routes/ReviewsRoutes');
const authRoutes = require('./routes/AuthRoutes')
const {join} = require("path");
const passport = require("./config/passport/passport");
require('dotenv').config();

app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret:  'sd4535', resave: true, saveUninitialized: true }));
app.use(passport.session({}));
app.use(passport.initialize({}));

app.set('view engine', 'ejs');
app.set('view cache', false);
app.set('views', join(__dirname, "./views"));
app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/stack', stackRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/auth', authRoutes);

// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login', 
		
//   })
// );


app.get('/', (req, res) => {
	res.render('pages/index');
})
app.get('/login', (req, res) => {
	res.render('pages/login');
})
const run = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}
run();