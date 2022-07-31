const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const postgraphile = require('./postgraphile');

require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(postgraphile);

app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));
