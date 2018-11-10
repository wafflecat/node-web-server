const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Start a new Express app
var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')


app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    // fs.appendFile('server.log', log + '\n');

    // For Node v7 or greater, need to include 3rd argument (a callback function)
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if(err){
    //         console.log('Unable to append to server.log');
    //     }
    // });

    next(); 
});

// This middleware is going to stop everything after it from executing.
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
        currentYear: new Date().getFullYear()
    });
    
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// console.log('End of program');
