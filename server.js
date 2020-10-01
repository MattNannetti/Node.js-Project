if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname, ' /view');
app.set('layout', './views/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

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


//Listenning to defined PORT
app.listen(process.env.PORT ||3000, () => {
    console.log('The application is running on localhost:3000');
});



