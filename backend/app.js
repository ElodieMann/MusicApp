const express = require('express');
const app = express();
const db = require('./config/knex');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', routes);

app.set('db', db);

app.listen(3300, () => console.log('Example app listening on port 3300'));