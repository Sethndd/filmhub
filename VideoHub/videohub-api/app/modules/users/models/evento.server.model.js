'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contenidoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  video: {
    type: String,
  },
  comentarios: [{
    persona: String,
    mensaje: String,
    tiempo: {
      type: Date,
      default: Date.now
    }
  }]
});

mongoose.model('Contenido', contenidoSchema);