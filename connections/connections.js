const Sequelize = require('sequelize');
const chalk = require('chalk');

const db = new Sequelize('Latihan Sequelize', 'irahama', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 1,

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000    
    },
});

// TES DB IF CONNECT:
db.authenticate()
    .then(()=> console.log(chalk.blue('DATABASE CONNECT')))
    .catch(err => console.error(err));


module.exports = db;