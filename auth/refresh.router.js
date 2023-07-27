const { handleRefreshToken } = require('./refreshToken_controller');
const router = require('express').Router();

router.get('/', handleRefreshToken)

module.exports = router;