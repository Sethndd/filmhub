const express = require("express")
const eventosController = require('../controllers/eventos.server.controller');
const isAuthenticated = require('../../../middlewares/auth.server.middlewares').isAuthenticated;

const router = express.Router();

router.route('/api/eventos').get(eventosController.findAll);
router.route('/api/eventos/:id').get(eventosController.findById);
router.route('/api/eventos/:id/comment').get(eventosController.findMsgById);


router.route('/api/eventos').post(isAuthenticated, eventosController.create);
router.route('/api/eventos/:id').post(isAuthenticated, eventosController.update);
router.route('/api/eventos/:id/comment').post(isAuthenticated, eventosController.comment);
router.route('/api/eventos/:id').delete(isAuthenticated, eventosController.delete);

module.exports = router