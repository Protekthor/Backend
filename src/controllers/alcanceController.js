
const CotizacionAlcance = require('../models/CotizacionAlcance');

exports.crearAlcance = async (req, res) => {
  try {
    const data = req.body;

    const nuevo = await CotizacionAlcance.create(data);

    return res.status(201).json({
      ok: true,
      message: 'Alcance creado correctamente',
      nuevo,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear alcance',
      error: error.message,
    });
  }
};

exports.obtenerAlcances = async (req, res) => {
  try {
    const alcances = await CotizacionAlcance.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: alcances.length,
      alcances,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener alcances',
      error: error.message,
    });
  }
};

exports.obtenerAlcancePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const alcance = await CotizacionAlcance.findByPk(id);

    if (!alcance) {
      return res.status(404).json({
        ok: false,
        message: 'Alcance no encontrado',
      });
    }

    return res.status(200).json({
      ok: true,
      alcance,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener alcance',
      error: error.message,
    });
  }
};

exports.actualizarAlcance = async (req, res) => {
  try {
    const { id } = req.params;

    const alcance = await CotizacionAlcance.findByPk(id);

    if (!alcance) {
      return res.status(404).json({
        ok: false,
        message: 'Alcance no encontrado',
      });
    }

    await alcance.update(req.body);

    return res.status(200).json({
      ok: true,
      message: 'Alcance actualizado correctamente',
      alcance,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar alcance',
      error: error.message,
    });
  }
};

exports.eliminarAlcance = async (req, res) => {
  try {
    const { id } = req.params;

    const alcance = await CotizacionAlcance.findByPk(id);

    if (!alcance) {
      return res.status(404).json({
        ok: false,
        message: 'Alcance no encontrado',
      });
    }

    await alcance.destroy();

    return res.status(200).json({
      ok: true,
      message: 'Alcance eliminado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar alcance',
      error: error.message,
    });
  }
};