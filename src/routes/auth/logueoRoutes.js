const express = require('express');
const routerAuth = express.Router();

const authController = require('../../controllers/authController')

module.exports = function() {
    
    // agregar primero /auth/ y despues la terminacion a elegir ej: /auth/login
  

    // inicio de sesion
    routerAuth.post('/login',authController.login);



    return routerAuth
}
    
