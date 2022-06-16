const express = require("express")
const authController = require('../controllers/auth.server.controller');
const authMiddleware = require('../../../middlewares/auth.server.middlewares');
const router = express.Router();

router.route('/api/auth/signup')
    .post(authController.signup);

router.route('/api/auth/signin')
    .post(authController.signin);

router.route('/api/auth/signout')
    .get(authController.signout);

    router.route('/api/secret/token')
    .post(authMiddleware.getAccessToken);

module.exports = router
