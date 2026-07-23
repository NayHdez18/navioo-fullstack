const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
    nameroute:{
        type: String,
        required: [true, "Please add the user's name"]
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "Please add the user's lastname"]
    },
    status:{
        type: Boolean,
        required: [true, "Please add the user's phone"]
    }
  
}, {
    Timestamp: true
});

module.exports = mongoose.model('Ruta', rutaSchema);