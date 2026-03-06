const Cotizaciones = require('../models/Cotizaciones');
const CotizacionItems = require('../models/CotizacionItems');
const CotizacionAlcance = require('../models/CotizacionAlcance');
const CondicionesComerciales = require('../models/CondicionesComerciales');
const CotizacionItemSubdescripciones = require('../models/CotizacionItemSubdescripciones');

exports.crearCotizacion = async (req, res) => {
  try {
    const data = req.body;

    const nuevaCotizacion = await Cotizaciones.create(data);

    return res.status(201).json({
      ok: true,
      message: 'Cotización creada correctamente',
      nuevaCotizacion,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear cotización',
      error: error.message,
    });
  }
};

exports.obtenerCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizaciones.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: cotizaciones.length,
      cotizaciones,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener cotizaciones',
      error: error.message,
    });
  }
};

exports.obtenerCotizacionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cotizacion = await Cotizaciones.findByPk(id);

    if (!cotizacion) {
      return res.status(404).json({
        ok: false,
        message: 'Cotización no encontrada',
      });
    }

    return res.status(200).json({
      ok: true,
      cotizacion,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener cotización',
      error: error.message,
    });
  }
};

exports.actualizarCotizacion = async (req, res) => {
  try {
    const { id } = req.params;

    const cotizacion = await Cotizaciones.findByPk(id);

    if (!cotizacion) {
      return res.status(404).json({
        ok: false,
        message: 'Cotización no encontrada',
      });
    }

    await cotizacion.update(req.body);

    return res.status(200).json({
      ok: true,
      message: 'Cotización actualizada correctamente',
      cotizacion,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar cotización',
      error: error.message,
    });
  }
};

exports.eliminarCotizacion = async (req, res) => {
  const t = await db.transaction();
  try {
    const { id } = req.params;

    const cotizacion = await Cotizaciones.findByPk(id, { transaction: t });

    if (!cotizacion) {
      await t.rollback();
      return res.status(404).json({
        ok: false,
        message: 'Cotización no encontrada',
      });
    }

    // 1) Buscar items de esta cotización para borrar subdescripciones
    const items = await CotizacionItems.findAll({
      where: { id_cotizaciones: id },
      attributes: ['id'],
      transaction: t,
    });

    const itemIds = items.map(i => i.id);

    if (itemIds.length > 0) {
      await CotizacionItemSubdescripciones.destroy({
        where: { id_cotizacion_items: itemIds },
        transaction: t,
      });
    }

    // 2) Borrar hijos directos
    await CotizacionItems.destroy({
      where: { id_cotizaciones: id },
      transaction: t,
    });

    await CotizacionAlcance.destroy({
      where: { id_cotizaciones: id },
      transaction: t,
    });

    await CondicionesComerciales.destroy({
      where: { id_cotizaciones: id },
      transaction: t,
    });

    // 3) Borrar la cotización
    await cotizacion.destroy({ transaction: t });

    await t.commit();

    return res.status(200).json({
      ok: true,
      message: 'Cotización eliminada correctamente',
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar cotización',
      error: error.message,
    });
  }
};