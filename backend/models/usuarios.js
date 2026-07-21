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