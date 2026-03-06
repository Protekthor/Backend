
const CotizacionItemSubdescripciones = require('../models/CotizacionItemSubdescripciones');

exports.crearSubdescripcion = async (req, res) => {
  try {
    const data = req.body;

    const nueva = await CotizacionItemSubdescripciones.create(data);

    return res.status(201).json({
      ok: true,
      message: 'Subdescripción creada correctamente',
      nueva,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear subdescripción',
      error: error.message,
    });
  }
};

exports.obtenerSubdescripciones = async (req, res) => {
  try {
    const subdescripciones = await CotizacionItemSubdescripciones.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: subdescripciones.length,
      subdescripciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener subdescripciones',
      error: error.message,
    });
  }
};

exports.obtenerSubdescripcionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const sub = await CotizacionItemSubdescripciones.findByPk(id);

    if (!sub) {
      return res.status(404).json({
        ok: false,
        message: 'Subdescripción no encontrada',
      });
    }

    return res.status(200).json({
      ok: true,
      sub,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener subdescripción',
      error: error.message,
    });
  }
};

exports.actualizarSubdescripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const sub = await CotizacionItemSubdescripciones.findByPk(id);

    if (!sub) {
      return res.status(404).json({
        ok: false,
        message: 'Subdescripción no encontrada',
      });
    }

    await sub.update(req.body);

    return res.status(200).json({
      ok: true,
      message: 'Subdescripción actualizada correctamente',
      sub,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar subdescripción',
      error: error.message,
    });
  }
};

exports.eliminarSubdescripcion = async (req, res) => {
  try {
    const { id } = req.params;

    const sub = await CotizacionItemSubdescripciones.findByPk(id);

    if (!sub) {
      return res.status(404).json({
        ok: false,
        message: 'Subdescripción no encontrada',
      });
    }

    await sub.destroy();

    return res.status(200).json({
      ok: true,
      message: 'Subdescripción eliminada correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar subdescripción',
      error: error.message,
    });
  }
};