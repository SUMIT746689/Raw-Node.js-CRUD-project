const fs = require('fs');
const path = require('path');

const crud ={};

crud.create= (data,message) =>{
   // console.log(data);
   const filepath =  path.join(module.path,'../.data','userdata',`${data.phoneNumber}.txt`);
   fs.readFile(filepath,'utf-8',(err,data)=>{
      if(!err){
         console.log(data);
      }
      else{
         message(400,'');
      }
   });
};

module.exports = crud;