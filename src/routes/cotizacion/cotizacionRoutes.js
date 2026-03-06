const express = require('express');
const routerCotizacion = express.Router();
const cotizaciones = require('../../controllers/cotizacionesController');

module.exports = function() {
    
// obtener todas las cotizaciones
routerCotizacion.get('/', cotizaciones.obtenerCotizaciones);

// obtener cotizacion por id
routerCotizacion.get('/:id', cotizaciones.obtenerCotizacionPorId);

// crear una cotizacion
routerCotizacion.post('/', cotizaciones.crearCotizacion);

// actualizar cotizacion
routerCotizacion.put('/:id', cotizaciones.actualizarCotizacion);

// actualizar el estatus de la cotizacion
// routerCotizacion.patch('/:id/estatus', cotizaciones.);

// eliminar cotizacion
routerCotizacion.delete('/:id', cotizaciones.eliminarCotizacion);

return routerCotizacion
}