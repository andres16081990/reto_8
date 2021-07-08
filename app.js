'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3001;

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
    
        date : Date,
        name : String,
        
    })
    const Visitors = mongoose.model('Visitors',VisitorsSchema,'mongo-1')
    
    
    const visit = [];

    app.get('/:name',(req,res)=>{
        
        const {name} = req.params;
        req.params.date = new Date();
        visit.push(req.params);
        Visitors.insertMany(visit)
          
        res.status(200).send(`<h1>El visitante fue almacenado con éxito</h1>`)

        console.log(visit)
    })
    app.get('/',(req,res)=>{
        const anonimo = 
        {
            name : "Anónimo",
            date : new Date()
        }
        visit.push(anonimo)
        Visitors.insertMany(visit)
        res.status(200).send(`<h1>El visitante fue almacenado con éxito</h1>`)
    })

    console.log('conected')
});



app.listen(port,()=>console.log(`App Running in port ${port}`));