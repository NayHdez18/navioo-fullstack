const express = require ('express');
const router = express.Router();
const {crearRuta, crearusuario, getRuta, getUsuario, uptdateruta, getUsuarios,deleteruta,deleteusuario, getRutas, uptdateusuario, loginusuario} = require ('../controladores/navioocontroller')


//+++++++++++ USUARIOS ++++++++++++
router.route('/usuarios').get(getUsuarios);
router.route('/usuarios').post(crearusuario);
router.route('/usuarios/:id').get(getUsuario);
router.route('/usuarios/:id').put(uptdateusuario);
router.route('/usuarios/:id').delete(deleteusuario);
router.route('/usuarios/login').post(loginusuario);


// ++++++++++++++ RUTA +++++++++++++++++++++++

router.route('/rutas').get(getRutas);
router.route('/rutas').post(crearRuta);
router.route('/rutas/:id').get(getRuta);
router.route('/rutas/:id').put(uptdateruta);
router.route('/rutas/:id').delete(deleteruta);

module.exports = router; 