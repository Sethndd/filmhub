const express = require("express")
const paqueteController = require('../controllers/paquete.server.controller');
const isAuthenticated = require('../../../middlewares/auth.server.middlewares').isAuthenticated;

const router = express.Router();

router.route('/api/paquetes').get(paqueteController.findAll);
router.route('/api/paquetes/:id').get(paqueteController.findById);


router.route('/api/paquetes').post(isAuthenticated, paqueteController.create);
router.route('/api/paquetes/:id').post(isAuthenticated, paqueteController.update);
router.route('/api/paquetes/:id').delete(isAuthenticated, paqueteController.delete);

module.exports = router