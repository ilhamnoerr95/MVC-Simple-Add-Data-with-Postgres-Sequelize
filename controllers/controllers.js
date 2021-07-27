const Schema = require('../models/schema')
const sequilize = require('sequelize')
const Op = sequilize.Op;

exports.cekData = ((req,res)=>{
    Schema.findAll()
    .then(data=>{
        res.status(200).send({
            data: data
        })
    })
    .catch(error=>{ console.error(error)});
})

exports.getData = ((req,res)=>{
    Schema.findAll()
        .then(schema =>{
            // render data ke file yg ada di views lalu data di pass in kedalam object
            res.render('schemaViews',{
                data: schema,
                
            });
        })
        .catch(Error => console.error(Error)); 
})

exports.addData = ((req,res)=>{
    // destructuring object
    let {title, technologies,
    budget, description, contact_email} = req.body;
    let errors = [];
    
    // validation fields
    if(!title){
        errors.push({text: 'please add a title'})
    }
    if(!technologies){
        errors.push({text: 'please add your technologies'})
    }
    if(!description){
        errors.push({text: 'please add description'})
    }
    if(!contact_email){
        errors.push({text: 'please add your email!'})
    }

    // CHECK FOR ERROR
    if(errors.length > 0){
        res.render('add',{
            errors,
            title, 
            technologies,
            budget,
            description, 
            contact_email
        });
    } else {

        if(!budget){
            budget = 'unknown';
        } else {
            budget = `IDR ${budget}`
        }
        
        // MAKE LOWERCASE AND REMOVE SPACE AFTER COMA
        technologies = technologies.toLowerCase().replace(/, /g, ',')

            // insert into table
        Schema.create({
            title: title,
            technologies: technologies,
            budget: budget,
            description: description,
            contact_email: contact_email
        })
        .then(schema => {res.redirect('/api')})
        .catch(err=> console.error(err))
    }
    }
)

// SEARCHING 
exports.getSearch = ((req,res)=>{
    const {term} = req.query;

    // make lowercase
    term = term.toLowerCase();

    Schema.findAll({where: {technologies: {[Op.like]: '%' + term + '%'}}})
        .then(schema => {
            res.render('schemaViews', {
                data: schema
            })
        })
        .catch(error => console.error(error))
})