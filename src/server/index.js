require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const registerAccount = require('../routes/registerRoute');
const depositRoute = require('../routes/depositRouter');
const transferRouter = require('../routes/transferRoute');
const loginRoute = require('../routes/loginRoute');

app.use(registerAccount);
app.use(depositRoute);
app.use(transferRouter);
app.use(loginRoute);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
