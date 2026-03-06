const Cotizadores = require('../models/Cotizadores')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    //  Verificar que exista el usuario
    const cotizador = await Cotizadores.findOne({
      where: { email }
    });

    if (!cotizador) {
      return res.status(400).json({
        ok: false,
        message: 'Correo o contraseña incorrectos'
      });
    }

    // Verificar contraseña
    const passwordValido = cotizador.validarPassword(password);

    if (!passwordValido) {
      return res.status(400).json({
        ok: false,
        message: 'Correo o contraseña incorrectos'
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: cotizador.id,
        email: cotizador.email,
        rol: cotizador.id_roles
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return res.status(200).json({
      ok: true,
      message: 'Login correcto',
      token,
      usuario: {
        id: cotizador.id,
        nombre: cotizador.nombre,
        email: cotizador.email,
        rol: cotizador.id_roles
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    });
  }
};

