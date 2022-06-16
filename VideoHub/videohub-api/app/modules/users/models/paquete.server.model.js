'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var paqueteSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

mongoose.model('Paquete', paqueteSchema);