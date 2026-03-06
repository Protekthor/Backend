const express = require('express');
const routercliente = express.Router();
const clientes = require('../../controllers/clientesController');

module.exports = function() {
    // listar cliente
    routercliente.get('/', clientes.listar);
    // obtener cliente por id 
    routercliente.get('/:id', clientes.obtener);
    // crear un cliente
    routercliente.post('/', clientes.crear);
    // acutlizar cliente
    routercliente.put('/:id', clientes.actualizar);

    // eliminar cliente
    routercliente.delete('/:id', clientes.eliminar);
    
    return routercliente
}

