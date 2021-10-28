const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

/**
 * This simply checks if the app is running locally and not in a container.
 * If so, it will start a livereload server that aids in development efficiency. 
 * Any changes in the public folder files will be hot reloaded. 
 */
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

// In production, Heroku will provide PORT, HOST
// In development with Docker, Dev.Dockerfile provides PORT, HOST
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST);