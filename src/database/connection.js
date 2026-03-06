const Sequelize =require('sequelize');

module.exports = new Sequelize('cotizaciones','root','',{
  host:'localhost',
  port: '3306',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  },
  // define:{
  //   timestamps : false    sirve para quitar el create y update que hace por default 
  // },


  //  logging:false //sirve para quitar los mensajes de db en terminal
})