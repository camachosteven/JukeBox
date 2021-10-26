const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

if (process.env.HOST !== 'production' &&
    process.env.ENVIRONMENT !== 'development') {
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
}

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'public')

const routes = require('./routes');
app.use(routes);


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST);