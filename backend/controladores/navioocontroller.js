const Usuario = require ('../models/usuarios');
const Ruta = require ('../models/rutasviaje');
const asyncHandler = require('express-async-handler');


const getUsuarios = asyncHandler(async(req, res) =>{
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
});
const getRutas = asyncHandler(async(req, res) =>{
    const rutas = await Ruta.find();
    res.status(200).json(rutas);
});
{}
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


// +++++++++++++++++CONTROLADORES DE RUTAS +++++++++++++++++++++++++++++++++


const crearRuta = asyncHandler (async(req, res) =>{

    const {nameroute, driver, status}=req.body;
    if(!nameroute || !driver || !status){
        throw new Error ("Todos los campos ser rellenados ")
    }
    const ruta=await Ruta.create ({
        nameroute, driver, status
    });
    res.status(201).json({ruta})
});

const getRuta = asyncHandler(async(req, res) =>{
    const ruta = await Ruta.FindById(req.params.id);
    if(ruta){
        res.status(404);
        throw new Error ("Ruta no encontrada")
    }
    res.status(200).json (ruta);
});

const uptdateruta = asyncHandler(async(req, res) =>{
    const ruta = await Ruta.FindById(req.params.id);
    if(!ruta){
        res.status(404);
        throw new Error ("Ruta no encontrada")
    }
    const updatedruta = await Ruta.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedruta);
});
const deleteruta = asyncHandler(async(req, res) =>{
    const ruta = await Ruta.findById(req.params.id);
    if(!ruta){
        res.status(404);
        throw new Error ("Ruta no encontrada")
    }
    await Ruta.deleteOne({_id: req.params.id})
    
    res.status(200).json({message: `Eliminar ruta de: ${req.params.id}`});
});



module.exports = { crearRuta, crearusuario, getRuta, getRutas, getUsuario, getUsuarios, deleteruta, deleteusuario, uptdateruta, uptdateusuario }