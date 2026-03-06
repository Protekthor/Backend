const Sequelize = require('sequelize');
const db = require('../database/connection');

const Clientes = db.define('clientes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  razon_social: {
    type: Sequelize.STRING(150),
    allowNull: false,
    validate:{
      notEmpty:{msg:'La razon social no puede ir vacia'}
    }
  },

  n_cliente: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate:{
      notEmpty:'El numero de cliente no puede ir vacio'
    }
  },

  email: {
    type: Sequelize.STRING(150),
    allowNull: true,

  },
  n_telefono:{
    type: Sequelize.INTEGER,
    allowNull:true,

  },
  direccion:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:{
        msg:"La direccion no puede ir vacia"
      }
    }
  },
  activo:{
      type: Sequelize.INTEGER,
        defaultValue: 1
  }

});

module.exports = Clientes;