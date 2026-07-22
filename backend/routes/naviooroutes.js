const express = require ('express');
const router = express.Router();
const {crearRuta, crearusuario, getRuta, getUsuario, uptdateruta, uptdateruta, getUsuarios,deleteruta,deleteusuario, getRutas, uptdateusuario} = require ('../controladores/navioocontroller')


router.route('/').get(getRutas);
router.route('/').get(getUsuarios);
router.route('/').post(crearusuario);
router.route('/').post(crearRuta);
router.route('/:id').get(getUsuario);
router.route('/:id').get(getRuta);
router.route('/:id').put(uptdateruta);
router.route('/:id').put(uptdateusuario);
router.route('/:id').delete(deleteusuario);
router.route('/:id').delete(deleteruta);

module.exports = router; 