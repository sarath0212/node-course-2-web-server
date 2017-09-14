const express = require ('express');

const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
var now = new Date().toString();

var log = (`${now}: ${req.method} ${req.url}`);
console.log(log);

fs.appendFile('server.log',log + '\n', (err)=>{
  console.log("asynchronous function is called with the callback and hence deprecation is prevented");
});
next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');

});



app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to the website which sarath has created'

    });

  });

app.get('/faster',(req,res)=>{
  res.render('faster.hbs',{
    pageTitle: 'Faster Page',

  });
});


app.get('/friends',(req,res)=>{
  res.send({
    name:'varun',
    likes:[
      'scolding me',
      'chit chat'
    ]
  })
})
app.listen(3000,()=>{
  console.log("Server is on port 3000");
});
