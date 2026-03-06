const CondicionesComerciales = require('../models/CondicionesComerciales');

exports.crearCondiciones = async (req, res) => {
  try {
    const data = req.body;

    const nueva = await CondicionesComerciales.create(data);

    return res.status(201).json({
      ok: true,
      message: 'Condiciones comerciales creadas correctamente',
      nueva,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear condiciones comerciales',
      error: error.message,
    });
  }
};

exports.obtenerCondiciones = async (req, res) => {
  try {
    const condiciones = await CondicionesComerciales.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: condiciones.length,
      condiciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener condiciones comerciales',
      error: error.message,
    });
  }
};

exports.obtenerCondicionesPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const condiciones = await CondicionesComerciales.findByPk(id);

    if (!condiciones) {
      return res.status(404).json({
        ok: false,
        message: 'Condiciones comerciales no encontradas',
      });
    }

    return res.status(200).json({
      ok: true,
      condiciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener condiciones comerciales',
      error: error.message,
    });
  }
};

exports.actualizarCondiciones = async (req, res) => {
  try {
    const { id } = req.params;

    const condiciones = await CondicionesComerciales.findByPk(id);

    if (!condiciones) {
      return res.status(404).json({
        ok: false,
        message: 'Condiciones comerciales no encontradas',
      });
    }

    await condiciones.update(req.body);

    return res.status(200).json({
      ok: true,
      message: 'Condiciones comerciales actualizadas correctamente',
      condiciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar condiciones comerciales',
      error: error.message,
    });
  }
};

exports.eliminarCondiciones = async (req, res) => {
  try {
    const { id } = req.params;

    const condiciones = await CondicionesComerciales.findByPk(id);

    if (!condiciones) {
      return res.status(404).json({
        ok: false,
        message: 'Condiciones comerciales no encontradas',
      });
    }

    await condiciones.destroy();

    return res.status(200).json({
      ok: true,
      message: 'Condiciones comerciales eliminadas correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar condiciones comerciales',
      error: error.message,
    });
  }
};