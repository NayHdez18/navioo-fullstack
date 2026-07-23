const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [function() { return this.designation !== 'empresa'; },"Please add the user's name"]
    },
    lastname:{
        type: String,
        required: [function() { return this.designation !== 'empresa'; },
        "El apellido es obligatorio"]
    },
    phone:{
        type: String,
        required: [true, "Please add the user's phone"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please add the user's email"]
    },
    password:{
        type: String,
        
        required: [true, "Please add the user's password"]
    },
    designation:{
         type: String,
         enum: ['pasajero','trabajador','empresa'],
        required: [true, "Please add the user's designation"],
        default: 'pasajero'
    },
    rfc: {
    type: String,
    trim: true,
    uppercase: true, // Lo guarda automáticamente en mayúsculas
    required: [
      function() { return this.designation === 'trabajador'; },
      "El RFC es obligatorio para usuarios tipo trabajador"
    ]
    },
    companyName: {
        type: String,
        required: [
      function() { return this.designation === 'trabajador'; },
      "El nombre de la empresa es obligatorio para trabajadores"
    ]
}
    
}, {
    Timestamp: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);