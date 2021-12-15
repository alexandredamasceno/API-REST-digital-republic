require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const registerUserRoute = require('../routes/registerRoute');

app.use(registerUserRoute);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
