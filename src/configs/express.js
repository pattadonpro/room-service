const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors');

module.exports = async (app) => {
    require('../configs/databases');

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(morgan('dev'));
}