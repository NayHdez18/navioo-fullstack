<<<<<<< HEAD
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the user's name"]
    },
    lastname:{
        type: String,
        unique: true,
        required: [true, "Please add the user's lastname"]
    },
    phone:{
        type: String,
        required: [true, "Please add the user's phone"]
    },
    email:{
        type: String,
        required: [true, "Please add the user's email"]
    },
    password:{
        type: String,
        required: [true, "Please add the user's password"]
    },
    designation:{
         type: String,
        required: [true, "Please add the user's designation"]
    }
    
}, {
    Timestamp: true
});

module.exports = mongoose.model('Usuario', contactSchema)
=======
const db = require('../config/db');

const obtenerUsuarios = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, email, rol FROM usuarios');
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      res.status(400);
      throw new Error('Por favor proporciona todos los campos obligatorios');
    }

    const [resultado] = await db.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, password, rol || 'cliente']
    );

    res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: { id: resultado.insertId, nombre, email, rol }
    });
  } catch (error) {
    next(error);
  }
};

const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    const [resultado] = await db.query(
      'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
      [nombre, email, rol, id]
    );

    if (resultado.affectedRows === 0) {
      res.status(404);
      throw new Error('Usuario no encontrado para actualizar');
    }

    res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      res.status(404);
      throw new Error('Usuario no encontrado para eliminar');
    }

    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
>>>>>>> edf723492aca58a1a6bc6da3dc124acab36ba79c
