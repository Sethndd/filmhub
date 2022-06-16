const mongoose = require('mongoose'),  Paquetes = mongoose.model('Paquete');

exports.findAll = (callback) => {
    Paquetes.find({}, (err, result) =>{
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

exports.create = (paqueteInfo, callback) => {
  var paquete = new Paquetes(paqueteInfo)

  paquete.save((err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

exports.findById = (id, callback) => {
  Paquetes.findOne({
    _id: id
  }, (err, result) => {
    var paquetes = result
      if (err) {
        callback('Something went wrong');
      } else if (!result) {
        callback('User credentials are not found');
      } else {
        callback(null, paquetes);
      }
  })
}

exports.update = (id, paqueteInfo, callback) => {
  Paquetes.replaceOne({
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
  Paquetes.findOneAndRemove({
    _id: id
  }, function (err, res) {
    if(err){
      callback(err);
    }else{
      callback(null,'');
    }
  });
};
