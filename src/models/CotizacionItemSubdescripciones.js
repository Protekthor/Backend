const Sequelize = require('sequelize');
const db = require('../database/connection');

const CotizacionItemSubdescripciones = db.define('cotizacion_item_subdescripciones', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texto: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },

  id_cotizacion_items:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
        model:'cotizacion_items',
        key:'id'
    }
  }
});

module.exports = CotizacionItemSubdescripciones;