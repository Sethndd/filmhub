const express = require("express")
const router = express.Router();
const multer = require('multer')
const path = require('path')

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './app/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    }
  });
  var upload = multer({ storage : storage}).single('file');
   
router.route('/api/upload').post((req, res) => {
    upload(req,res,function(err) {
        if(err) {
            console.log(err)
            return res.send(err);
        }
        res.send(req.file);
    });
});

module.exports = router