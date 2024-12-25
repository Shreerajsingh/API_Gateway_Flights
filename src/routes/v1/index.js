const express = require('express');

const { InfoController } = require('../../controllers');

const  UserRouter = require('./user-routes');

const router = express.Router();

router.get('/info', InfoController.info);

router.use('/signup', UserRouter);

module.exports = router;