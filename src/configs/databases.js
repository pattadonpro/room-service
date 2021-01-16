const mongoose = require('mongoose'),
    config = require('../configs/app');

const databases = {

    mongoDB() {
        return mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, error => {
            if (error) {
                console.error('MongoDB error: ', error);
                return;
            }
            console.log("MongoDB connected")
        });
    },

};

module.exports = databases.mongoDB();
