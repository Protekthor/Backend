const express = require('express');
const routerAlcance = express.Router();
const ctzalcance = require('../../controllers/alcanceController');


module.exports = function() {
   //obtener todos los alcances
routerAlcance.get('/', ctzalcance.obtenerAlcances);

// obtener alcance por id
routerAlcance.get('/:id', ctzalcance.obtenerAlcancePorId);

// crear alcance 
routerAlcance.post('/', ctzalcance.crearAlcance);

// actualizar alcance
routerAlcance.put('/:id', ctzalcance.actualizarAlcance);

// eliminar alcance 
routerAlcance.delete('/:id', ctzalcance.eliminarAlcance);
 
return routerAlcance
}

