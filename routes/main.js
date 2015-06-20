var router = require('express').Router();
var ctrl = require('../app_server/controllers/main');

router.get('/', ctrl.index);

module.exports = router;