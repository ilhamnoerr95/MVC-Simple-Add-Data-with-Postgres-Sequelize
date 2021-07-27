const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

// sequelize import dari folder connections:
const sequelize = require('./connections/connections');

const app = express();

// HANDLEBARS 
app.engine('handlebars', exphbs({
    defaultLayout:'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Express BodyParser
app.use(express.urlencoded({extended: false}));

// ROUTES FOR HOME
app.get('/',(req,res) => res.render('index',{
    layout: 'landing'
}))

// ROUTES MIDDLEWARE(MAIN ROUTES):
app.use('/api', require('./routes/routes'));

const PORT = process.env.PORT || 4000;

// CONNECTION
sequelize.sync()
    .then(app.listen(PORT,
    console.log(chalk.keyword('orange')(`server started on port ${PORT}`))));

