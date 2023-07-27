const { handleLogout } = require('./logout_controller');

const router = require('express').Router();

router.get('/', handleLogout);

module.exports = router;