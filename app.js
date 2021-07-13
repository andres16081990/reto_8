'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mongo-1', {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> { console.log('conected')});



const VisitorSchema = mongoose.Schema({    
    date : {
        type : Date,
    },
    name : {
        type : String,
        require: true
    },        
})
const Visitor = mongoose.model('Visitor',VisitorSchema) 


app.get('/',  (req,res)=>{
    
    const visitors = new Visitor(req.query)

    if(req.query.name === undefined || req.query.name === ''){

        visitors.name = 'Anónimo';
        visitors.date = Date.now();
        visitors.save();
    }
    else{
        visitors.date = Date.now();            
        visitors.save();
    }        
    res.status(200).send(`<h1>El visitante fue almacenado con éxito</h1>`)

})



app.listen(port,()=>console.log(`App Running in port ${port}`));