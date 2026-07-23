const Usuario = require ('../models/usuarios');
const Empresa = require('../models/empresa');
const Ruta = require ('../models/rutasviaje');
const asyncHandler = require('express-async-handler');


const getUsuarios = asyncHandler(async(req, res) =>{
    const {designation}=req.query;
    const usuariofiltro = designation ? {designation: designation}: {};
    const usuarios = await Usuario.find(usuariofiltro);
    res.status(200).json(usuarios);
});
const getRutas = asyncHandler(async(req, res) =>{
    const rutas = await Ruta.find().populate('driver','name lastname phone email designation');
    res.status(200).json(rutas);
});

const crearusuario = asyncHandler (async(req, res) =>{

    const {name, lastname, phone, email, password, designation, rfc, companyName}=req.body;
    if(!name|| !phone || !email || !password || !designation){
        throw new Error ("Todos los campos ser rellenados ")
    }

    if (designation !== 'empresa' && !lastname) {
        res.status(400);
        throw new Error("El apellido es obligatorio.");
    }

  if ((designation === 'trabajador' || designation ==='empresa') && (!rfc || !companyName)) {
    res.status(400);
    throw new Error("El RFC y el nombre de la empresa es obligatorio para el perfil de trabajador.");
  }
  const usuarioExiste = await Usuario.findOne({ email });
  if (usuarioExiste) {
    res.status(400);
    throw new Error("El correo ya está registrado.");
  }
    const usuario=await Usuario.create ({
        name,
         lastname: designation === 'empresa' ? (lastname || 'representante:') : lastname,
          phone, 
          email, 
          password, 
          designation, 
          rfc: (designation === 'trabajador' || designation ==='empresa') ? rfc : undefined,
          companyName: (designation === 'trabajador' || designation === 'empresa') ? companyName : undefined

    });

    if (designation === 'empresa') {
        await Empresa.create({
            companyName,
            rfc,
            usuarioAdmin: usuario._id
        });
    }
    res.status(201).json({usuario})
});

const getUsuario = asyncHandler(async(req, res) =>{
    const usuario = await Usuario.findById(req.params.id);
    if(usuario){
        res.status(404);
        throw new Error ("usuario no encontrado")
    }
    res.status(200).json (usuario);
});

const uptdateusuario = asyncHandler(async(req, res) =>{
    const usuario = await Usuario.findById(req.params.id);
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

const loginusuario = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error ('por favor, ingrese los datos')
    }
    const usuario = await Usuario.findOne({email});

    if (usuario && usuario.password === password) {
    res.status(200).json({
      _id: usuario._id,
      name: usuario.name,
      lastname: usuario.lastname,
      email: usuario.email,
      designation: usuario.designation,
      companyName: usuario.companyName,
      rfc: usuario.rfc
    });
  } else {
    res.status(401);
    throw new Error('Credenciales inválidas (email o contraseña incorrectos)');
  }
})
// +++++++++++++++++CONTROLADORES DE RUTAS +++++++++++++++++++++++++++++++++


const crearRuta = asyncHandler (async(req, res) =>{
    
    const {name, driverid, status}=req.body;
    const drivernew = await Usuario.findById(driverid)
    if (!drivernew || drivernew.designation !=='trabajador'){
        res.status(400);
        throw new error ('Usuario no encontrado')
    }
    const ruta=await Ruta.create ({
        nameroute:name,
        driver:driverid,
        status: status
    });
    res.status(201).json({ruta})
});

const getRuta = asyncHandler(async(req, res) =>{
    const ruta = await Ruta.FindById(req.params.id);
    if(!ruta){
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



module.exports = { crearRuta, crearusuario, getRuta, getRutas, getUsuario, getUsuarios, deleteruta, deleteusuario, uptdateruta, uptdateusuario, loginusuario }