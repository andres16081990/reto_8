'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect('mongodb://localhost/mongo-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {

    const VisitorsSchema = mongoose.Schema({    
        date : {
            type : Date,
        },
        name : {
            type : String,
            require: true
        },        
    })
    const Visitors = mongoose.model('Visitor',VisitorsSchema) 
    
    
    app.get('/',  (req,res)=>{
        
        const visitors = new Visitors(req.query)

        if(req.query.name === undefined || req.query.name === ''){

            visitors.name = 'Anonimo';
            visitors.date = Date.now();
            visitors.save();
        }
        else{
            visitors.date = Date.now();            
            visitors.save();
        }        
        res.status(200).send(`<h1>El visitante fue almacenado con éxito</h1>`)

    })

     console.log('conected')

});



app.listen(port,()=>console.log(`App Running in port ${port}`));