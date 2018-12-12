const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();    
    var log = `${ now } : ${req.method} : ${req.url}`
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to append file');
        }
    });
    next();
});
//for website updating time page
//app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
//});

app.get('/',(req,res)=>{
    res.send('Home Page',{
         pagetitle:'home page',
        currentdate: new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle:'about us',
        currentdate: new Date().getFullYear()
    });
});
app.listen(3000,()=>{
    console.log('server in 3000')
});