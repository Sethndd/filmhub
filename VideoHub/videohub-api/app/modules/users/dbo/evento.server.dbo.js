const mongoose = require('mongoose'), Contenidos = mongoose.model('Contenido');

exports.findAll = (callback) => {
    Contenidos.find({}, (err, result) => {
        var paquetes = result

        if (err) {
            callback('Something went wrong');
        } else if (!result) {
            callback('There are no results');
        } else {
            callback(null, paquetes);
        }
    })
}

exports.create = (contenidoInfo, callback) => {
    var contenidos = new Contenidos(contenidoInfo)
  
    contenidos.save((err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    })
  }

  exports.findById = (id, callback) => {
    Contenidos.findOne({
      _id: id
    }, (err, result) => {
      var contenido = result
        if (err) {
          callback('Something went wrong');
        } else if (!result) {
          callback('User credentials are not found');
        } else {
          callback(null, contenido);
        }
    })
  }

  exports.saveComment = (id, comment, callback) => { 
    Contenidos.findOneAndUpdate({
        _id: id
      }, {
        $push: { comentarios: comment }
      }, function (err, res) {
        if(err){
          callback(err);
        }else{
          callback(null,'');
        }
      });
  }
  
  exports.update = (id, paqueteInfo, callback) => {
    Contenidos.replaceOne({
      _id: id
    }, paqueteInfo, function (err, res) {
      if(err){
        callback(err);
      }else{
        callback(null,'');
      }
    });
  };
  
  exports.delete = (id, callback) => {
    Contenidos.findOneAndRemove({
      _id: id
    }, function (err, res) {
      if(err){
        callback(err);
      }else{
        callback(null,'');
      }
    });
  };