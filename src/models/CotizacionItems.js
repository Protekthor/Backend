const Sequelize = require('sequelize');
const db = require('../database/connection');

const CotizacionItems = db.define('cotizacion_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },

  unidad: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate:{
      notEmpty:{msg:'La unidad es requerida'}
    }
  },

  descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty:{msg:'La descripcion es obligatoria'}
    }
  },

  precioUnitario: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El precio unitario es obligatorio'}
    }
  },

  subtotal: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El subtotal es obligatorio'}
    }
  },

  iva:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:{msg:'El IVA es obligatorio'}
    }
  },

  total:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:{msg:'El total es obligatorio'}
    }
  },

  tipo: {
    type: Sequelize.ENUM('COTIZACION', 'POLIZA'),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El tipo debe ser COTIZACION o POLIZA, es obligatorio'}
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

module.exports = CotizacionItems;