const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app= express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/entidad1', require('./routes/entidad1Routes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));