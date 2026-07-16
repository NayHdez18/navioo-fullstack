const usuario = require ('../models/usuarios');
const ruta = require ('../models/rutasviaje');
const asyncHandler = require('express-async-handler');

const getUsuario = asyncHandler(async(req, res) =>{
    const usuarios = await usuario.find();
    res.status(200).json(usuarios);
});
const getRutas = asyncHandler(async(req, res) =>{
    const rutas = await ruta.find();
    res.status(200).json(rutas);
});

const crearusuario = asyncHandler (async(req, res) =>{

    const 
})