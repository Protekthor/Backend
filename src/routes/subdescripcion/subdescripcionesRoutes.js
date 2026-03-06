const express = require('express');
const routerSubDes = express.Router();
const subdescripciones = require('../../controllers/subdescripcionesController');

module.exports = function() {
routerSubDes.get('/', subdescripciones.obtenerSubdescripciones);
routerSubDes.get('/:id', subdescripciones.obtenerSubdescripcionPorId);
routerSubDes.post('/', subdescripciones.crearSubdescripcion);
routerSubDes.put('/:id', subdescripciones.actualizarSubdescripcion);
routerSubDes.delete('/:id', subdescripciones.eliminarSubdescripcion);

return routerSubDes
}