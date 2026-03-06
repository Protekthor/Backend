const express = require('express');
const routerClientes = require('./src/routes/clientes/clientesRoutes');
const routerRoles = require('./src/routes/roles/rolesRoutes');
const routerCotizadores = require('./src/routes/cotizadores/cotizadoresRoutes');
const routerCotizacion = require('./src/routes/cotizacion/cotizacionRoutes');
const routerCondiciones = require('./src/routes/condicionescomerciales/condicionesRoutes')
const routerAlcance = require('./src/routes/alcance/alcanceRoutes')
const routerItems = require('./src/routes/items/itemsRoutes');
const routerSubDes = require('./src/routes/subdescripcion/subdescripcionesRoutes')
const routerAuth = require('./src/routes/auth/logueoRoutes')
// Variables de desarrollo
require('dotenv').config({path:'variables.env'})


// Configuracion y modelos DB
 const db = require('./src/database/connection');
require('./src/models/Clientes');
require('./src/models/Roles');
require('./src/models/Cotizadores');
require('./src/models/Cotizaciones');
require('./src/models/CondicionesComerciales');
require('./src/models/CotizacionAlcance');
require('./src/models/CotizacionItems');
require('./src/models/CotizacionItemSubdescripciones');
db.sync().then(() => console.log('DB conectada')).catch((error) => console.log(error))



//Aplicacion Principal
const app = express();

// habilitar body parser para leer formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// habilitar cors
const cors = require('cors');

app.use(
  cors({
    origin: ["http://localhost:5173", 'http://localhost:5000'], //todas las urlss de aqui pueden hacer peticiones
    credentials: true
  })
);
http://localhost:5000/roles/crearRol


// Routing funcional 
app.use('/roles/', routerRoles());
app.use('/clientes/', routerClientes());
app.use('/cotizadores/',routerCotizadores());
app.use('/cotizacion/', routerCotizacion());
app.use('/condiciones', routerCondiciones());
app.use('/alcance/', routerAlcance());
app.use('/items/', routerItems());
app.use('/subdescripcion', routerSubDes());
app.use('/auth/',routerAuth());
// // // // // //Routing


// // app.use('/cotizaciones/',routerCotizaciones());
// //como esta el frontend 
// app.use('/api/clientes', require('./src/routes/clientes/clientesRoutes'));





app.listen(process.env.PORT, () => {
  console.log('servidor corriendo');
})