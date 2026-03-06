const Sequelize = require('sequelize');
const db = require('../database/connection');

const Roles = db.define('roles',{
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre:{ 
        type:Sequelize.STRING(65),
        allowNull:false,
        validate:{
            notEmpty:{msg:'El nombre del rol no puede ir vacio'}
        }
    }
  
});

module.exports = Roles;