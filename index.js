//code initi:
require('./models/db'); //database included:
const url = 'mongodb://localhost:27017/todo';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const hbs = require('hbs');
const appController = require('./controller/appController');
const expressHandlebars = require('express-handlebars');
const port = 4000;
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


//midleware setup:
app.use(morgan('dev')); //for devlopment:
app.use(cors()); //for cross origine resource sharing:
app.use('/',appController);  //vertual path removed:


// configuring the views file:
app.use(bodyParser.json());
app.set('views',path.join(__dirname, '/views/'));
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts/'
}));
app.set('view engine','hbs');

//static files setup e.g css,js,images:
app.use(express.static('assets'));
app.use('/css', express.static(__dirname + 'assets/css'));
app.use('/js', express.static(__dirname + 'assets/js'));
app.use('/images',express.static(__dirname + 'assets/images'));

// default routes:
app.all('/',function(req,res){
    res.render('./login/index.hbs');
});

//lsten:
app.listen(port, function(){
    console.log(`Server is running on port : ${port}`);
});