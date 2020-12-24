const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const keys = require('./config/keys');

const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

const app = express();

// Connecting DB
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB is connected...'))
    .catch((error) => console.log('MongoDB error: ', error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'));
app.use(cors());
// Parse incoming request bodies in a middleware before our handlers, available under the req.body property.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);


module.exports = app;
