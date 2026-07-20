const Usuario = require ('../models/usuarios');
const Ruta = require ('../models/rutasviaje');
const asyncHandler = require('express-async-handler');
const { compileStyleAsync } = require('vue/compiler-sfc');

const getUsuarios = asyncHandler(async(req, res) =>{
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
});
const getRutas = asyncHandler(async(req, res) =>{
    const rutas = await Ruta.find();
    res.status(200).json(rutas);
});

const crearusuario = asyncHandler (async(req, res) =>{

    const {name, lastname, phone, email, password, designation}=req.body;
    if(!name|| !lastname || !phone || !email || !password || !designation){
        throw new Error ("Todos los campos ser rellenados ")
    }
    const usuario=await Usuario.create ({
        name, lastname, phone, email, password, designation
    });
    res.status(201).json({usuario})
});
const crearRuta = asyncHandler (async(req, res) =>{

    const {nameroute, driver, status}=req.body;
    if(!nameroute || !driver || !status){
        throw new Error ("Todos los campos ser rellenados ")
    }
    const ruta=await Ruta.create ({
        nameroute, driver, status
    });
    res.status(201).json({ruta})
})

const getUsuario = asyncHandler(async(req, res) =>{
    const usuario = await Usuario.FindById(req.params.id);
    if(usuario){
        res.status(404);
        throw new Error ("usuario no encontrado")
    }
    res.status(200).json (usuario);
});

const uptdateusuario = asyncHandler(async(req, res) =>{
    const usuario = await Usuario.FindById(req.params.id);
    if(!usuario){
        res.status(404);
        throw new Error ("usuario no encontrado")
    }
    const updatedusuario = await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedusuario);
});
const deleteusuario = asyncHandler(async(req, res) =>{
    const usuario = await Usuario.findById(req.params.id);
    if(!usuario){
        res.status(404);
        throw new Error ("Usuario no encontrado")
    }
    await Usuario.deleteOne({_id: req.params.id})
    
    res.status(200).json({message: `Eliminar usuario de: ${req.params.id}`});
});
