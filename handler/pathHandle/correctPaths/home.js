const { read } = require("../../../library/data");
const crud = require("../../../library/data");
const utilities = require("../../../utilities/utilities");

const homeHandle = {} ;

homeHandle.home =(reqValue,statusCode)=> {
  
   const allMethods = ["get","post","put","delete"];
   

   if(allMethods.indexOf(reqValue.method)>-1){
      homeHandle._token[reqValue.method](reqValue,statusCode);
   }
    
}
//create a function for handle 
homeHandle._token = {} ;

homeHandle._token.post = (reqValue,statusCode)=>{
   const password = typeof reqValue.body.password === 'string'
    && reqValue.body.password.trim().length > 0 ? reqValue.body.password : false ;
   
   const phoneNumber = typeof reqValue.body.phoneNumber === 'string'
   && reqValue.body.phoneNumber.trim().length === 11 ? reqValue.body.phoneNumber : false ;
   
   console.log(phoneNumber,password);
   if(phoneNumber && password){
      crud.read('users',phoneNumber,(err,data)=>{
         if(!err){
            const tokenId = utilities.token(20) ;
            const extend = Date.now()+60*60*1000 ; 
            const tokenObject = {
               id : tokenId,
               phoneNumber,
               extend
            } ;
            console.log(tokenObject)
             crud.create('token',tokenId,tokenObject,err=>{
            console.log(err) ;

         });
         }
         else{
            console.log(phoneNumber ,'is not valid');
         }
      });
   }
   else{
      statusCode(500);
   }
};

homeHandle._token.get = (reqValue,statusCode)=>{
   const id = typeof reqValue.query.id === 'string' ? reqValue.query.id : false ;
   console.log(id,'is');
   if(id){
      crud.read('token',id,(err,data)=>{
         if(!err){
            console.log(data);
         }
         else{   console.log(err); }
      })
   }
   else{
      statusCode(500);
   }
};

homeHandle._token.put = (reqValue,statusCode)=>{
   const id = typeof reqValue.body.id === 'string'
   && reqValue.body.id.trim().length > 0 ? reqValue.body.id : false ;
  
   const phoneNumber = typeof reqValue.body.phoneNumber === 'string'
   && reqValue.body.phoneNumber.trim().length === 11 ? reqValue.body.phoneNumber : false ;
   
   console.log(id);
   if(id){
      crud.read('token',id,(err,data)=>{
         if(!err){
            data = utilities.parseJSON(data);
            if(data.extend < Date.now()){
               data.extend = Date.now()+60*60*1000;
               crud.create('token',id,data,err=>{
                  console.log(err);
               })
            }
            else{
               console.log('time extended note requires');
            }
         }
         else{
            console.log(id,'is not Valid');
         }
      })
   }
   else{
      statusCode(500);
   }
};

homeHandle._token.delete = (reqValue,statusCode)=>{
   const id = typeof reqValue.body.id === 'string'
   && reqValue.body.id.trim().length > 0 ? reqValue.body.id : false ;
   
   if(id){
      crud.read('token',id,(err,data)=>{
         if(!err){
            data = utilities.parseJSON(data);
            console.log(data);
            crud.delete('token',id,err=>{
               console.log(err);
            })
         }
         else{
            console.log('this in not valid ');
         }
      });
   }
};
homeHandle._token.verify = (id,phoneNumber,callBack) =>{
   if(id && phoneNumber){
      crud.read('token',id,(err,data)=>{
         if(!err && data){
            data = utilities.parseJSON(data);
            if(data.phoneNumber === phoneNumber){
               callBack(true);
            }
            else{
               callBack(false);
            }
         }
         else{
            callBack(false);
         }
      });
     
   }
   else{
      callBack(false);
   }
};

module.exports = homeHandle ;