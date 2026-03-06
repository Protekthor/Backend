const express = require('express');
const routerItems =  express.Router();
const items = require('../../controllers/itemsController');


module.exports = function() {
    // obtener todos los items
    routerItems.get('/', items.obtenerItems);

    // obtener item por id
    routerItems.get('/:id', items.obtenerItemPorId);

    // crear item 
    routerItems.post('/', items.crearItem);

    // actualizar item 
    routerItems.put('/:id', items.actualizarItem);

    // eliminar item 
    routerItems.delete('/:id', items.eliminarItem);

    return routerItems
}
