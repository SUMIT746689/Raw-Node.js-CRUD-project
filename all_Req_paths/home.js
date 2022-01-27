const crud = require('../crud_server/crud');
const { password } = require('../utilities/resources');
const resources = require('../utilities/resources'); 

const home = (req_all,status)=>{
    const methods = ['get','post','put','delete'];
    if(methods.indexOf(req_all.method)>-1){
        home.token[req_all.method](req_all,status);
    };
    console.log((methods.indexOf(req_all.method)));
};

home.token ={};

home.token.post = (req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const firstName = typeof(req_all.bufferdataParse.firstName) === 'string' &&
    req_all.bufferdataParse.firstName.length > 0 ? req_all.bufferdataParse.firstName :false;
    
    const lastName = typeof(req_all.bufferdataParse.lastName) === 'string' &&
    req_all.bufferdataParse.lastName.length > 0 ? req_all.bufferdataParse.lastName :false;

    const toAgreement = typeof(req_all.bufferdataParse.toAgreement) === 'boolean'? req_all.bufferdataParse.toAgreement :false;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;

    const total_data = {firstName,lastName,toAgreement,phoneNumber,password};
    console.log(total_data);
    // status(300,"mehedi");
    if(phoneNumber && password && firstName && lastName){
        crud.create(phoneNumber,total_data,(err,data)=>{
            if(!err){
                console.log(data,JSON.stringify(err));
                status(200,{message:"sucessfully create"})
            }
            else{
                status(400,err);
            }
        });
    }
    else{
        status(400,{message:"This is error in crate"});
    }
    console.log(resources.password(20));
};

//When get method calls
home.token.get=(req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;

    if(phoneNumber && password ){
        crud.read(phoneNumber,(err,data)=>{
            if(!err){
                
                if (data.password == password){
                    status(200,data);
                }
                else{
                    status(405,{message:"password is not not matching"})
                }
            }
            else{
                status(400,data);
            }
        });
    }
    else{
        status(400,{message:"This is error in crate"});
    }
};

home.token.delete=(req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;
    
    if(phoneNumber && password){
        crud.read(phoneNumber,(err,data)=>{
            if(!err && password == data.password){
                crud.delete(phoneNumber,(err)=>{
                    if(!err){
                        status(200,{message:"deleted sucessfull"})
                    }
                    else{
                        status(400,{message:"Fall in problem for delete this file"})
                    }
                });
            }
            else{
                status(400,{message:"Can't read this file"})
            }
        });
    }
    else{
        status(300,{message:"Input phoneNumber and Password correctly"})
    }
};

home.token.put=(req_all,status)=>{};


module.exports = home;