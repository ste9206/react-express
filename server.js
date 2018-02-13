const express = require('express');
const Parse = require('parse/node');
const bodyParser = require('body-parser');
const request = require('request-promise');
const req = require('request');
const cookieSession = require('cookie-session');

const app = express();
const port = process.env.PORT || 5000;

const user = require('./server/user');

//PARSE SETUP
Parse.initialize('helpAdvisorId');
Parse.serverURL = 'https://helpadvisorapp.herokuapp.com/parse';
Parse.masterKey = 'fBQuWNumy4';

//SETUP FOR POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'));

app.use(cookieSession({
  name: 'parse-session',
  secret: "SECRET_SIGNING_KEY",
  maxAge: 15724800000
}));


app.get('/user', (req, res) => {
    
    user.currentUser(app,req,res,Parse).then((currentUser)=>{

      console.log(currentUser);
  
      if(currentUser){
        res.send({user:currentUser.objectId});
      }
      else{
        res.send({user:undefined});
      }
    })
    .catch((error)=>{
      console.log(error);
      res.status(500).send(error);
    });
    
});

app.post('/login',(req,res)=>{


  var username = req.body.username.trim();
  var password = req.body.password.trim(); 

      Parse.User.logIn(username, password).then((user)=> {

        req.session.user = user;    
        req.session.token = user.getSessionToken();   
          
        res.send(JSON.stringify(user));
        
      }, (error) =>{
        
        req.session = null;
        res.sendStatus(500).send(error);
        
      });
    
});


app.post('/logout',(req,res)=>{

	if(req.session){
	    req.session = null;

	    res.send(JSON.stringify('Cookies deleted'));
    }

   
}); 




app.listen(port, () => console.log(`Listening on port ${port}`));
