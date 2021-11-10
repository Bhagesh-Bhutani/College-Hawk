const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
// Flash requires sessions, will do later
// const flash = require('connect-flash');
const setFlashMiddleware = require('./config/set-flash');

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware for sass
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static('./assets'));

app.use(express.urlencoded({extended: true}));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// app.use(flash());
// app.use(setFlashMiddleware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server is running at : http://localhost:${port}`);
});