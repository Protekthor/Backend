const express = require('express');
const routerRoles = express.Router();

const rolesController = require('../../controllers/rolesController')

module.exports = function() {

      // agregar primero /roles/ y despues la terminacion a elegir ej: /roles/api/crearRol
      
      //crear el rol 
      routerRoles.post('/api/crearRol', rolesController.guardarRoles);

      //listar todo los roles
      routerRoles.get('/api/obtenerRoles',rolesController.obtenerRoles);

      // listar roles por id
      routerRoles.get('/api/obtenerRol/:id', rolesController.obtenerRolPorId);

      // editar rol
      routerRoles.put('/api/editarRol/:id',rolesController.actualizarRol)
      // elimiar rol
      routerRoles.delete('/api/eliminarRol/:id',rolesController.eliminarRol)

      
    return routerRoles;
}