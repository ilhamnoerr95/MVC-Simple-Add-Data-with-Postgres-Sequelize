const express = require('express');
const Router = express.Router();
const controller = require('../controllers/controllers')

// BRING DATABASE:
const db = require('../connections/connections');
// CALL MODELS: 
const Schema = require('../models/schema')

// cek data
Router.get('/data',controller.cekData);

// APP GET => HOME
Router.get('/',controller.getData);

// DISPLAY ADD GIG FORM
Router.get('/add',(req,res) => res.render('add'))

// ADDING WITH POST REQUEST
Router.post('/add', controller.addData)

// SEARCHING
Router.get('/search', controller.getSearch)

module.exports = Router