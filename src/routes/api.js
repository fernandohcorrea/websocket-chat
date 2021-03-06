const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

router.route('/load_cfg').get(AppController.getCfg);

module.exports = router;