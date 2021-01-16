const express = require('express'),
    app = express(),
    config = require('./configs/app');

require('./configs/express')(app);

app.use(require('./routes'));

require('./configs/errorHandler')(app);

app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`)
});
