require('dotenv').config();
require('./app/db/connection');
let cors = require('cors');
let express = require('express');
let logger = require('morgan');
let noRoute = require('http-errors');
let apiRoutes = require('./app/routes/zindex');
let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(__dirname + '/uploads'));
apiRoutes.forEach((route) => {
    app.use(route.path, route.file);
});
app.use((req, res, next) => next(noRoute(404)));
app.listen(process.env.PORT, () => {
    console.log(`->Server is running on ${process.env.PORT}.`);
});
module.exports = app;
