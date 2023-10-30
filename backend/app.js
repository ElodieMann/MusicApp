const express = require('express');
const app = express();
const db = require('./config/knex');
const routes = require('./routes/routes');

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/', routes);

app.set('db', db);

app.listen(3000, () => console.log('Example app listening on port 3000'));