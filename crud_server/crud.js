const fs = require('fs');
const path = require('path');
const { parseJSON } = require('../utilities/resources');

const crud ={};

crud.create= (filename,data,callback) =>{
   // console.log(data);
   const filepath =  path.join(module.path,'../.data','userdata',`${filename}.txt`);
  fs.open(filepath,'wx',(err,user)=>{
     if(!err){
        const convert_data = JSON.stringify(data);
      fs.writeFile(filepath,convert_data,(err)=>{
         if(!err){
          return  callback(err,'');
         }
         else{
           return callback({Error_messasge:"This file write problem"},'');
         }
      });
     }
     else{
        callback({Error_messasge:"This file is already Exist"},user);
     }
  });
};

crud.read=(filename,callback)=>{
   const filepath =  path.join(module.path,'../.data','userdata',`${filename}.txt`);
   fs.open(filepath,'r',(err,data)=>{
      if(!err){
         fs.readFile(filepath,'utf8',(err,data)=>{
            if(!err){
               const parseData = parseJSON(data);
               callback(err,parseData);
            }
            else{
               callback(err,data);
            }
         })
      }
      else{
         callback(err,data);
      }
   });
};

crud.update=(filename,callback,)=>{
   const filepath =  path.join(module.path,'../.data','userdata',`${filename}.txt`);
   // crud.read(filename,callback)=>{
      
   // }
}
crud.delete=(filename,callback)=>{
   const filepath =  path.join(module.path,'../.data','userdata',`${filename}.txt`);
   fs.unlink(filepath,(err)=>{
      if(!err){
         callback(err);
      }
      else{
         callback(err);
      }
   })
}

module.exports = crud;