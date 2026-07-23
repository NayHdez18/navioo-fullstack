const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: [true, "Please add the company's name"]
    },
    rfc:{
        type: String,
        required: [true, "Agrega el RFC de la empresa"],
        unique: true,
        uppercase: true
    },
    usuarioAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
}, {
    Timestamp: true
});

module.exports = mongoose.model('Empresa', empresaSchema);