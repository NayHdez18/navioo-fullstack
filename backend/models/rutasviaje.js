const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
    nameroute: {
        type: String,
        required: [true, "Por favor agrega el nombre de la ruta"]
    },
    code: {
        type: String,
        default: "R-01"
    },
    color: {
        type: String,
        default: "#14CBA8"
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
   
    startName: { type: String, default: "Origen" },
    startCoords: { type: [Number], required: true }, // [lat, lng]
    endName: { type: String, default: "Destino" },
    endCoords: { type: [Number], required: true }    // [lat, lng]
}, {
    timestamps: true
});

module.exports = mongoose.model('Ruta', rutaSchema);