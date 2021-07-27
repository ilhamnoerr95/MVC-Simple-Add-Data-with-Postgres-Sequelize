const Sequelize = require('sequelize');
// CALL CONNECTION DATABASE
const db = require('../connections/connections')

// CONNECT TO TABLE DENGAN NAMA IRAHAMA
const Schema = db.define('irahama',{
    title:{
        type: Sequelize.STRING
    },
    technologies:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
    budget:{
        type: Sequelize.STRING
    },
    contact_email:{
        type: Sequelize.STRING
    },
});

module.exports = Schema;