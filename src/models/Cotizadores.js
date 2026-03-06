const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../database/connection');

const Cotizadores = db.define('cotizadores', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING(70),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede ir vacío' }
    }
  },

  email: {
    type: Sequelize.STRING(35),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'El email no puede ir vacío' },
      isEmail: { msg: 'Debe ser un email válido' }
    }
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La contraseña no puede ir vacía' },
      len: {
        args: [6, 60],
        msg: 'La contraseña debe tener mínimo 6 caracteres'
      }
    }
  },

  n_telefono: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El teléfono no puede ir vacío' }
    }
  },

  puesto: {
    type: Sequelize.STRING(255),
    allowNull:false,
    validate:{
      notEmpty: {msg:'El puesto no puede ir vacio'}
    }
  },

  activo: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  id_roles:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
        model:'roles',
        key:'id'
    }
  },


});


//  hook para hashear contraseña antes de crear
Cotizadores.beforeCreate(async (cotizador) => {
  const salt = await bcrypt.genSalt(14);
  cotizador.password = await bcrypt.hash(cotizador.password, salt);
});


//  hook para hashear si se actualiza password
Cotizadores.beforeUpdate(async (cotizador) => {
  if (cotizador.changed('password')) {
    const salt = await bcrypt.genSalt(14);
    cotizador.password = await bcrypt.hash(cotizador.password, salt);
  }
});


//  Método para comparar contraseña (login)
Cotizadores.prototype.validarPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = Cotizadores;