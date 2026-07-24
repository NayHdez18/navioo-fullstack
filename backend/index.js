const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app= express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const errorHandler = require('./middleware/errorhandler');

app.use(express.json());

app.use('/api', require('./routes/naviooroutes'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));