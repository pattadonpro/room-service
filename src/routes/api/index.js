const router = require('express').Router();

router.use('/rooms', require('./roomRoute'));

module.exports = router;
