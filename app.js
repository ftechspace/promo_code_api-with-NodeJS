const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
// body-parser
// npm install --save body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// making uploads folder public
app.use('/uploads', express.static('uploads'));

// connecting to mongoDB
const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://fortunecode:fortunecode@safeboda-e9haz.mongodb.net/test?retryWrites=true', 
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise

// log Request
// npm install --save morgan
const morgan = require('morgan')
app.use(morgan('dev'))


// // resouces directries
const userRoutes = require('./api/routes/user');
const eventRoutes = require('./api/routes/event')
const promoRoutes = require('./api/routes/promo')

app.use('/api/v1.0/user', userRoutes);
app.use('/api/v1.0/event', eventRoutes)
app.use('/api/v1.0/promo', promoRoutes)

// error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;