const createError = require('http-errors');

module.exports = (app) => {

    app.use((req, res, next) => {
        next(createError(404, 'endpoint not found'));
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        const message = err.message || 'Internal Server Error';
        const status = err.status || 500;
        res.status(status).json({message: message});
    });

}
