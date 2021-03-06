if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs');
app.set('views', __dirname, ' /view');
app.set('layout', './views/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));

// connecting to mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));


//link to our first route (or controller)
app.use('/', indexRouter);
app.use('/authors', authorRouter);


//Listenning to defined PORT
app.listen(process.env.PORT ||3000, () => {
    console.log('The application is running on localhost:3000');
});



