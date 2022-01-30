const fs = require('fs');
const path = require('path');
const { parseJSON } = require('../utilities/resources');


const crud ={};

crud.create= (file,filename,data,callback) =>{
   // console.log(data);
   const filepath =  path.join(module.path,'../.data',file,`${filename}.txt`);
  fs.open(filepath,'wx',(err,fileDescriptor)=>{
     if(!err){
        const convert_data = JSON.stringify(data);
      fs.writeFile(fileDescriptor,convert_data,(err)=>{
         if(!err){
          return  callback(err,'');
         }
         else{
           return callback({Error_messasge:"This file write problem"},'');
         }
      });
     }
     else{
        callback({Error_messasge:"This file is already Exist"},'');
     }
  });
};

crud.read=(file,filename,callback)=>{
   const filepath =  path.join(module.path,'../.data',file,`${filename}.txt`);
   fs.open(filepath,'r',(err,fileDescriptor)=>{
      if(!err){
         fs.readFile(fileDescriptor,'utf8',(err,data)=>{
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
         callback(err,'');
      }
   });
};

crud.update=(file,filename,data,callback,)=>{
   const filepath =  path.join(module.path,'../.data',file,`${filename}.txt`);
   fs.open(filepath,'r+',(err,fileDescriptor)=>{
      if(!err){
      fs.truncate(fileDescriptor,0,(err)=>{
            if(!err){
               fs.writeFile(fileDescriptor,JSON.stringify(data),(err)=>{
                  if(!err){
                     callback(false)
                  }
                  else{
                     callback(true);
                  }
               });
            }
         });
      }
   else{
      callback(true);
   }
   });
}
crud.delete=(file,filename,callback)=>{
   const filepath =  path.join(module.path,'../.data',file,`${filename}.txt`);
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