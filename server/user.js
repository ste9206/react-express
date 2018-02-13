const request = require('request-promise');


var currentUser = (app,req,res,Parse) =>{
   
    return new Promise((resolve,reject)=>{
        
    if(req.session.token){    

        request({
         
          uri:'https://helpadvisorapp.herokuapp.com/parse/users/me',
          headers: {
            'X-Parse-Application-Id': 'helpAdvisorId',
            'X-Parse-Session-Token': req.session.token
          },
          json:true    
        
        }).then((userData) => {
           
           if(userData){    
            
              resolve(userData);
           
           }
            
        }).catch((error) => {
            
            console.log(`User do not exist: ${error}`);
            reject(error);
        });

   }
   else{
  
       resolve(undefined);
   
   }
  
  });

};


module.exports = {
    currentUser
}