
const CotizacionItems = require('../models/CotizacionItems');
const CotizacionItemSubdescripciones = require('../models/CotizacionItemSubdescripciones');

exports.crearItem = async (req, res) => {
  try {
    const data = req.body;

    const nuevoItem = await CotizacionItems.create(data);

    return res.status(201).json({
      ok: true,
      message: 'Item creado correctamente',
      nuevoItem,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear item',
      error: error.message,
    });
  }
};

exports.obtenerItems = async (req, res) => {
  try {
    const items = await CotizacionItems.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener items',
      error: error.message,
    });
  }
};

exports.obtenerItemPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CotizacionItems.findByPk(id);

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'Item no encontrado',
      });
    }

    return res.status(200).json({
      ok: true,
      item,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener item',
      error: error.message,
    });
  }
};

exports.actualizarItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CotizacionItems.findByPk(id);

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'Item no encontrado',
      });
    }

    await item.update(req.body);

    return res.status(200).json({
      ok: true,
      message: 'Item actualizado correctamente',
      item,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar item',
      error: error.message,
    });
  }
};

exports.eliminarItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CotizacionItems.findByPk(id);

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'Item no encontrado',
      });
    }

    // borrar subdescripciones del item
    await CotizacionItemSubdescripciones.destroy({
      where: { id_cotizacion_items: id },
    });

    await item.destroy();

    return res.status(200).json({
      ok: true,
      message: 'Item eliminado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar item',
      error: error.message,
    });
  }
};