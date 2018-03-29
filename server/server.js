const path = require('path');

const express = require('express');
const ejs = require('ejs');

const app = express();
const HOST = '0.0.0.0';
const PORT = 5000;
const STATIC_PATH = path.resolve(__dirname, '../client-dist/static');
const VIEWS_PATH = path.resolve(__dirname, '../client-dist');

app.engine('html', ejs.renderFile);
app.set('views', VIEWS_PATH);
app.set('view engine', 'html');

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
})
app.use('/static', express.static(STATIC_PATH));

app.get('*', (req, res) => res.render('index'));

app
    .listen(PORT, HOST, () => console.log('=== SERVER is listening on port ' + PORT))
    .on('error', err => console.error(err))