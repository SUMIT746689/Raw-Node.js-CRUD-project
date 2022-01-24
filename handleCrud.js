//dependies 
const fs = require('fs') ;
const path = require('path');

//create a crud obj
const handleCrud = {} ;
const folderPath = path.join(__dirname,'database');

handleCrud.create = (dir,file,data,callBack)=>{
    
    data = JSON.stringify(data);
    fs.open(folderPath+'/'+dir+'/'+file+'.json','w+',(err,file)=>{
        if(!err && file){
            fs.writeFile(file,data,err=>{
                if(!err){
                    fs.close(file,err=>{
                        if(!err){
                            callBack(false);
                            console.log('successfully create file ');
                        }
                        else{
                            callBack(err);
                        }
                    });
                }
                else{
                    callBack(err);
                }
            });
        }
        else {
            callBack(err);
        }
    });
};

handleCrud.read = (dir,file,callBack)=>{
    const paths= path.join(folderPath,dir,file);
    fs.readFile (`${paths}.json`,'utf8',(err,data)=>{
      if(!err){
        callBack(err,data);
      }
      else{
          callBack(err,data);
      }
    });
};

handleCrud.update = (dir,file,datas,callBack)=>{
    const paths = path.join(folderPath,dir,file);
    fs.open(`${paths}.json`,'w+',(err,files)=>{
        if(!err && files){
            const data= JSON.stringify(datas);
            fs.writeFile(files,data,err=>{
                if(!err){
                    fs.close(files,err=>{
                        if(!err){
                            callBack(false);
                            console.log('sucessfull Update');
                        }
                        else{
                            callBack(err);
                        }
                });
            }
                else{
                    callBack(err);
                };
            });
        }
        else{
            callBack(err);
        }
    });
}

handleCrud.delete = (dir,file,callBack)=>{
    const paths = path.join(folderPath,dir,file);
    fs.readFile(`${paths}.json`,'utf8',(err,data)=>{
        if(!err){
            fs.unlink(`${paths}.json`,err=>{
                if(!err){
                    callBack(false);
                    console.log('Sucessfully Deleted')
                }
                else{
                    callBack(err);
                }
            })
        }
        else{
            callBack(err);
        }
    })
}



module.exports = handleCrud ;