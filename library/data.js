//dependent
const fs = require('fs');
const path = require('path');

//create a fs variable obj
const crud = {};
const paths = path.join(__dirname,'/../','.data');
//create a fs 
crud.create = (dir,file,data,callback)=>{
    const stringData = JSON.stringify(data);
   
   
    fs.open(`${paths}/${dir}/${file}.json`,'w+',(err,fileDerection)=>{
        if(!err){
            fs.writeFile(fileDerection,stringData,(err2)=>{
                if(!err2){
                    fs.close(fileDerection,(err3)=>{
                        if(!err){
                            callback('Successfull Create a file');
                        }
                        else{
                            callback(err3)
                        }
                    });
                }
                else{
                    callback(err2);
                }
            });
        }
        else{
            callback(err);
        }
    })
} 
//Read a fs 
crud.read = (dir,file,callback)=>{
    fs.readFile(`${paths}/${dir}/${file}.json`,'utf8',(err,data)=>{
        if(!err){
           callback(err,data); 
        }
        else{
            callback(err);
        }
    });
};
//Upadata a file 
crud.update = (dir,file,data,callback) =>{
    const stringData = JSON.stringify(data);
    fs.appendFile(`${paths}/${dir}/${file}.json`,stringData,(err)=>{
        if(!err){
            callback('Updated File');
        }
        else{
            callback(err);
        }
    })
}
//delete a file
crud.delete = (dir,file,callback) =>{
    fs.unlink(`${paths}/${dir}/${file}.json`,(err)=>{
        if(!err){}
        else{ callback(err)}
    })
}
module.exports = crud ;