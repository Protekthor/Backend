const  Clientes  = require('../models/Clientes');
const { ok, created, bad, notFound, fail } = require('../utils/http');

exports.listar = async (req, res) => {
  try {
    const rows = await Clientes.findAll({ order: [['id', 'DESC']] });
    return ok(res, rows, 'Clientes listados');
  } catch (error) {
    return fail(res, 'Error listando clientes', error.message);
  }
};

exports.obtener = async (req, res) => {
  try {
    const row = await Clientes.findByPk(req.params.id);
    if (!row) return notFound(res, 'Cliente no encontrado');
    return ok(res, row, 'Cliente encontrado');
  } catch (error) {
    return fail(res, 'Error obteniendo cliente', error.message);
  }
};

exports.crear = async (req, res) => {

  try{
      const clientes = req.body;
  const crearCliente = await Clientes.create(clientes);

  return res.status(201).json({
  ok:true,
  message:"Cliente Creado correctamente",
  crearCliente
  })
  }catch(error){

 if(error.name === 'SequelizeValidationError'){

    const errores = {};

    error.errors.forEach(err => {
        errores[err.path] = err.message;
    });

    return res.status(400).json({
        ok:false,
        errores
    });

 }

}
};


exports.actualizar = async (req, res) => {
  try {
    const row = await Clientes.findByPk(req.params.id);
    if (!row) return notFound(res, 'Cliente no encontrado');

    const { nombre, n_telefono, email } = req.body;

    await row.update({
      nombre: nombre !== undefined ? String(nombre).trim() : row.nombre,
      n_telefono: n_telefono !== undefined ? n_telefono : row.n_telefono,
      email: email !== undefined ? email : row.email,
    });

    return ok(res, row, 'Cliente actualizado');
  } catch (error) {
    return fail(res, 'Error actualizando cliente', error.message);
  }
};

exports.eliminar = async (req, res) => {
  try {
    const row = await Clientes.findByPk(req.params.id);
    if (!row) return notFound(res, 'Cliente no encontrado');
    await row.destroy();
    return ok(res, {}, 'Cliente eliminado');
  } catch (error) {
    return fail(res, 'Error eliminando cliente', error.message);
  }
};