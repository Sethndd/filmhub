const express = require("express")
const indexController = require('../controllers/index.server.controller');
const router = express.Router();
    
router.route('/').get(indexController.indexResopnse);

module.exports = router
