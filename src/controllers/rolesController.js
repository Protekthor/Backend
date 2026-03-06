const Roles = require('../models/Roles');


//crear el rol 
exports.guardarRoles = async (req,res) => {
    
    try{
        const roles = req.body;
        const nuevoRol = await Roles.create(roles);
        
        return res.status(201).json({
        ok:true,
        message:"Rol guardado correctamente",
        nuevoRol
        })
    }catch(error){  
        console.log(error)
    }
}

// listar todos los roles

exports.obtenerRoles = async (req,res) => {
    try { 
    const roles = await Roles.findAll({
         order: [["id", "DESC"]],
    })

    return res.status(200).json({
      ok: true,
      total: roles.length,
      roles,
    });
    }catch(error){ 
        console.log("El error es:", error);
            return res.status(500).json({
            ok: false,
            message: "Error al obtener los roles",
            error: error.message,
        });
    } 
}


// obtener Rol por id
exports.obtenerRolPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const roles = await Roles.findByPk(id);

    if (!roles) {
      return res.status(404).json({
        ok: false,
        message: "Rol no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      roles,
    });
  } catch (error) {
    console.log("El error es:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener roles",
      error: error.message,
    });
  }
};

// actualizar roles por id
exports.actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;

    const roles = await Roles.findByPk(id);

    if (!roles) {
      return res.status(404).json({
        ok: false,
        message: "Rol no encontrado",
      });
    }

    // Actualiza con lo que venga en el body
    await roles.update(req.body);

    return res.status(200).json({
      ok: true,
      message: "Rol actualizado correctamente",
      roles,
    });
  } catch (error) {
    console.log("El error es:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar roles",
      error: error.message,
    });
  }
};

// eliminar roles por id
exports.eliminarRol = async (req, res) => {
  try {
    const { id } = req.params;

    const roles = await Roles.findByPk(id);

    if (!roles) {
      return res.status(404).json({
        ok: false,
        message: "Rol no encontrado",
      });
    }

    await roles.destroy();

    return res.status(200).json({
      ok: true,
      message: "Rol eliminado correctamente",
    });
  } catch (error) {
    console.log("El error es:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar roles",
      error: error.message,
    });
  }
};