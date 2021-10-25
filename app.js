const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('dotenv');
const axios = require('axios');


const app = express();
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
app.use(connectLiveReload());
// livereload for development
const reloadServer = livereload.createServer();
reloadServer.watch(path.join(__dirname, 'public'));
reloadServer.server.once('connection', () => {
    setTimeout(() => {
        reloadServer.refresh('/');
    }, 100);
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'public')

const routes = require('./routes');
app.use(routes);




app.listen(3000);