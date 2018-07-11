const express = require('express');
const hbs = require('hbs');
const eddyMalou = require('eddy-malou');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();


    log = `${now}: ${req.method} on ${req.url}`;
    console.log(log);
    fs.appendFile('serve.log', log + '\n', (err) => {
        if (err) {
            console.log ('Unable to append to server.log');
        }
    })
    next();
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'MyWebsite',
        welcomeMessage: eddyMalou.congolexicomatisation()
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server listen on port 3000.');
}); 