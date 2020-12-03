const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8800;
const routes = require('./routes');

app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.use('', routes)
