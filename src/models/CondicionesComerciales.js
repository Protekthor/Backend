const Sequelize = require('sequelize');
const db = require('../database/connection');

const CondicionesComerciales = db.define('condiciones_comerciales', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  impuesto: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate:{
      notEmpty:{msg:"Los impuestos no deben ir vacios"}
    }
  },
  formaPago: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate:{
      notEmpty:{msg:'La forma de pago no deber ir vacia'}
    }
  },
  vigenciaPrecios: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate:{
      notEmpty:{msg:'La vigencia de precios no puede ir vacia'}
    }
  },
  tiempoEntregaEquipo: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  tiempoEntregaServicio: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El tiempo de entrega del servicio no pude ir vacio'}
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

module.exports = CondicionesComerciales;