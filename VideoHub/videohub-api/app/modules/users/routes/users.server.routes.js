const express = require("express")
const usersController = require('../controllers/users.server.controller');
const isAuthenticated = require('../../../middlewares/auth.server.middlewares').isAuthenticated;

const router = express.Router()

router.route('/api/me').get(isAuthenticated, usersController.me);
router.route('/api/usuarios/:id').get(isAuthenticated, usersController.finbById);
router.route('/api/usuarios').get(isAuthenticated, usersController.getAll);

module.exports = router