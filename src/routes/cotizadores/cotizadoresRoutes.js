const express = require('express');
const routerCotizadores = express.Router();

const cotizadoresController = require('../../controllers/cotizadoresController')

module.exports = function() {
    
    // agregar primero /cotizadores/ y despues la terminacion a elegir ej: /cotizadores/api/crearCotizador
    // crear cotizador 
    routerCotizadores.post('/api/crearCotizador',cotizadoresController.crearCotizador);
    // obtener a todos los cotizadores
    routerCotizadores.get('/api/obtenerCotizadores', cotizadoresController.obtenerCotizadores);
    // obtener cotizador por id
    routerCotizadores.get('/api/obtenerCotizador/:id', cotizadoresController.obtenerCotizadorPorId);
    // actualizar cotizador 
    routerCotizadores.put('/api/actualizarCotizador/:id', cotizadoresController.actualizarCotizador);
    //elimina el cotizador si no tiene cotizaciones y si tiene cotizaciones desactiva al cotizador
    routerCotizadores.delete('/api/eliminarCotizador/:id', cotizadoresController.eliminarCotizador);
    

    return routerCotizadores
}
    