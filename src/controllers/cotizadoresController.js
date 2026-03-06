const Cotizadores = require('../models/Cotizadores');
const Cotizaciones = require('../models/Cotizaciones');;
const bcrypt = require('bcryptjs');

exports.crearCotizador =async (req,res) => {
    try{
        const cotizadores = req.body;
      
        const crearCotizador = await Cotizadores.create(cotizadores);
        cotizadores.password = undefined;
        return res.status(201).json({
           ok :'Cotizador creado correctamente',
           crearCotizador
        })
    }catch(error){
        // error de email duplicado
        if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            ok: false,
            message: 'El correo ya ha sido registrado'
        });
        }

    // otros errores
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor',
      error: error.message
    });

    }
}


//obtener todos los cotizadores
exports.obtenerCotizadores = async (req, res) => {
  try {
    const cotizadores = await Cotizadores.findAll({
      attributes: { exclude: ['password'] } // no devolver password
    });

    return res.json({
      ok: true,
      cotizadores
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener cotizadores',
      error: error.message
    });
  }
};


//obtener cotizador por id
exports.obtenerCotizadorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cotizador = await Cotizadores.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!cotizador) {
      return res.status(404).json({
        ok: false,
        message: 'Cotizador no encontrado'
      });
    }

    return res.json({
      ok: true,
      cotizador
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};



//actualizar cotizador
exports.actualizarCotizador = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const cotizador = await Cotizadores.findByPk(id);

    if (!cotizador) {
      return res.status(404).json({
        ok: false,
        message: 'Cotizador no encontrado'
      });
    }

    // Si actualiza password, volver a hashear
    if (datos.password) {
      const salt = bcrypt.genSaltSync(10);
      datos.password = bcrypt.hashSync(datos.password, salt);
    }

    await cotizador.update(datos);

    return res.json({
      ok: true,
      message: 'Cotizador actualizado correctamente'
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar',
      error: error.message
    });
  }
};
// eliminar o desactivar cotizador
exports.eliminarCotizador = async (req, res) => {
  try {
    const { id } = req.params;

    const cotizador = await Cotizadores.findByPk(id);

    if (!cotizador) {
      return res.status(404).json({
        ok: false,
        message: 'Cotizador no encontrado',
      });
    }

    // contar cuántas cotizaciones tiene ese cotizador
    const totalCotizaciones = await Cotizaciones.count({
      where: { id_cotizadores: id },
    });

    // Si tiene cotizaciones ,no se borra, solo se desactiva el cotizador
    if (totalCotizaciones > 0) {
      await cotizador.update({ activo: 0 });

      return res.json({
        ok: true,
        action: 'desactivado',
        message: 'El cotizador tiene cotizaciones, se desactivó en lugar de eliminarse.',
        totalCotizaciones,
      });
    }

    // Si no tiene cotizaciones el cotizador, se borra al cotizador
    await cotizador.destroy();

    return res.json({
      ok: true,
      action: 'eliminado',
      message: 'Cotizador eliminado correctamente.',
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar/desactivar',
      error: error.message,
    });
  }
};