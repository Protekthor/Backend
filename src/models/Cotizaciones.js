const Sequelize = require('sequelize');
const db = require('../database/connection');

const Cotizaciones = db.define('cotizaciones', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroCotizacion: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate:{
      notEmpty:{
        msg:'El numero de cotizacion no puede ir vacio'
      }
    }
  },
  
  atencionA: {
    type: Sequelize.STRING(180),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El nombre de a quien se le cotiza no puede ir vacio'}
    }
  },
   // subtotal de cotizacion
  subtotalCotizacion: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El subtotal no puede ir vacio'}
    }
  },
  ivaCotizacion: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El iva de la cotizacion no puede ir vacia'}
    }
  },     
  totalCotizacion: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
    validate:{
      notEmpty:{msg:'El total de la cotizacion no puede ir vacio'}
    }
  },
  //fin de el total de la cotizacion 
  tienePoliza: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },

  tieneDesglose: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },


  // totales poliza (si tienePoliza)
  polizaSubtotal: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: true,
  },
  polizaIva: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: true,
  },
  polizaTotal: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: true,
  },

  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate:{
      notEmpty:{msg:'La fecha no puede ir vacia'}
    }
  },

  estatus: {
    type: Sequelize.ENUM('Pendiente', 'Aprobada', 'Rechazada', 'Enviada'),
    allowNull: false,
    defaultValue: 'Pendiente',
  },

  nombre_excel:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:{msg:'Debes ingresar un Excel'}
    }
  },
  nombre_pdf:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:{msg:'El PDF debe tener un nombre'}
    }
  },
  id_clientes:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
        model:'clientes',
        key:'id'
    }
  },
  id_cotizadores:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
        model:'cotizadores',
        key:'id'
    }
  },


});

module.exports = Cotizaciones;