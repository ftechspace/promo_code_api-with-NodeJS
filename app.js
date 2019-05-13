const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// connecting to mongoDB
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://fortunecode:fortunecode@safeboda-e9haz.mongodb.net/test?retryWrites=true`, 
    { useNewUrlParser: true }
);


// log Request
const morgan = require('morgan')
app.use(morgan('dev'))


// // routes resouces directries
const userRoutes = require('./api/routes/user')
const eventRoutes = require('./api/routes/event')
const tripRoutes = require('./api/routes/trip')
const promoRoutes = require('./api/routes/promo')

// base endpoints
app.use('/api/v1.0/user', userRoutes)
app.use('/api/v1.0/event', eventRoutes)
app.use('/api/v1.0/trip', tripRoutes)
app.use('/api/v1.0/promo', promoRoutes)

// error handling for 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

// error handling for server
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;