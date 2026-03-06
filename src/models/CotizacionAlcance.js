const Sequelize = require('sequelize');
const db = require('../database/connection');

const CotizacionAlcance = db.define('cotizacion_alcance', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  concepto: {
    type: Sequelize.STRING(500),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El concepto no puede ir vacio'}
    }
  },
  alcance:{
    type:Sequelize.STRING(255),
    allowNull:true,
    validate:{
      notEmpty:{msg:'El alcance  no pude ir vacio'}
    }
  },
  id_cotizaciones:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
        model:'cotizaciones',
        key:'id'
    }
  },
  
  
});

module.exports = CotizacionAlcance;