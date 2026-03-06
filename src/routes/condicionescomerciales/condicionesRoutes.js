const express = require('express');
const routerCondiciones = express.Router();
const condicionescm = require('../../controllers/condicionesController');

module.exports = function() {
    // obtner todas las condiciones comerciales
    routerCondiciones.get('/', condicionescm.obtenerCondiciones);

    // obtner condiciones por id
    routerCondiciones.get('/:id', condicionescm.obtenerCondicionesPorId);

    //crear condiciones comerciales
    routerCondiciones.post('/', condicionescm.crearCondiciones);

    // actualizar condicion comercial
    routerCondiciones.put('/:id', condicionescm.actualizarCondiciones);

    // eliminar condicion comercial
    routerCondiciones.delete('/:id', condicionescm.eliminarCondiciones);

    return routerCondiciones
}
;