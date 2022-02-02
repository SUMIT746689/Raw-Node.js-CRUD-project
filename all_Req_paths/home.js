const crud = require('../crud_server/crud');
const { token ,hash } = require('../utilities/resources');
const tokenHandler = require('./tokenHandler');


const home = (req_all,status)=>{
    const methods = ['get','post','put','delete'];
    if(methods.indexOf(req_all.method)>-1){
        home.user[req_all.method](req_all,status);
    }
    else{
        status(400,{Error_message:'Method is not Exist in Server'})
    }
    console.log((methods.indexOf(req_all.method)));
};

home.user ={};

home.user.post = (req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const firstName = typeof(req_all.bufferdataParse.firstName) === 'string' &&
    req_all.bufferdataParse.firstName.length > 0 ? req_all.bufferdataParse.firstName :false;
    
    const lastName = typeof(req_all.bufferdataParse.lastName) === 'string' &&
    req_all.bufferdataParse.lastName.length > 0 ? req_all.bufferdataParse.lastName :false;

    const toAgreement = typeof(req_all.bufferdataParse.toAgreement) === 'boolean' &&
    req_all.bufferdataParse.toAgreement === true ? req_all.bufferdataParse.toAgreement :false;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;

    if(phoneNumber && password && firstName && lastName && toAgreement){
        const sequre_password = hash(password);
        const total_data = {firstName,lastName,toAgreement,phoneNumber,password:sequre_password};
        console.log(total_data);

        crud.create('user',phoneNumber,total_data,(err,data)=>{
            if(!err ){
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
};

//When get method calls
home.user.get=(req_all,status)=>{
    const phoneNumber = typeof(req_all.query.number) === 'string' &&
    req_all.query.number.trim().length === 11 ? req_all.query.number : false ;
    
    const tokenId = typeof(req_all.query.token_Id) === 'string' &&
    req_all.query.token_Id.trim().length >=20 ? req_all.query.token_Id : false ;
    console.log(tokenId,phoneNumber);

    tokenHandler._token.verify(tokenId,phoneNumber,(err)=>{
        if(!err){
            if(phoneNumber ){
                crud.read('user',phoneNumber,(err,data)=>{
                    if(!err){
                        delete data.password;
                        status(200,data);
                    }
                    else{
                        status(400,err);
                    }
                });
            }
            else{
                status(400,{message:"This is error in crate"});
            }
        }
        else{
            status(400,{err:"varify err"+err});
        }
    })
    
};


home.user.put=(req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const tokenId = typeof(req_all.bufferdataParse.token_Id) === 'string' &&
    req_all.bufferdataParse.token_Id.trim().length >=20 ? req_all.bufferdataParse.token_Id : false ;
    console.log(tokenId," token : ",phoneNumber);
    
    if(phoneNumber && tokenId){

        tokenHandler._token.verify(tokenId,phoneNumber,(err)=>{
            if(!err){
                crud.read('user',phoneNumber,(err,data)=>{
            
                    if(!err){
                        
                        const firstName = typeof(req_all.bufferdataParse.firstName) === 'string' &&
                        req_all.bufferdataParse.firstName.length > 0 ? req_all.bufferdataParse.firstName :false;
                        
                        const lastName = typeof(req_all.bufferdataParse.lastName) === 'string' &&
                        req_all.bufferdataParse.lastName.length > 0 ? req_all.bufferdataParse.lastName :false;
        
                        const toAgreement = typeof(req_all.bufferdataParse.toAgreement) === 'boolean'? req_all.bufferdataParse.toAgreement :false;
                        console.log(firstName!==data.firstName)
        
                        const password =typeof(req_all.bufferdataParse.password) === 'string' &&
                        req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;
                        
                        const secure_password = hash(password);
                        console.log(secure_password);
        
                        if(firstName!==data.firstName || lastName!==data.lastName || secure_password!==data.password){
                            
                            const prev_data = {...data};
                            if(firstName !==prev_data.firstName){ prev_data.firstName=firstName};
                            
                            if(lastName !==prev_data.lastName){ prev_data.lastName=lastName};
                            
                            if(secure_password !==prev_data.password){ prev_data.password=secure_password};
                            
                            
                            crud.update('user',phoneNumber,prev_data,(err)=>{
                                if(!err){
                                    delete prev_data.password
                                    status(200,prev_data);
                                }
                                else{
                                    status(450,err);
                                }
                            })
                        }
                        else{
                            status(400,{Error_Message:"nothing changed for updated"})
                        }
                    }
                    else{
                        status(500,{Error_Message:"Fall in problem"})
                    }
                })
            }
            else{
                status(400,{err:"varify Error"});
            }
        })
    }
    else{
        status(400,{Error_Message:'wrong Password'})
    }
};

home.user.delete=(req_all,status)=>{
    const phoneNumber = typeof(req_all.query.number) === 'string' &&
    req_all.query.number.trim().length === 11 ? req_all.query.number : false ;
       
    const tokenId = typeof(req_all.query.token_Id) === 'string' &&
    req_all.query.token_Id.trim().length >=20 ? req_all.query.token_Id : false ;
    console.log(tokenId,phoneNumber);
       
    if(phoneNumber && tokenId ){
        tokenHandler._token.verify(tokenId,phoneNumber,(err)=>{
            if(!err){
                crud.read('user',phoneNumber,(err,data)=>{
                    if(!err && data){
                        crud.delete('user',phoneNumber,(err)=>{
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
                status(400,{err:"varify Error"})
            }
        })
    }
    else{
        status(300,{message:"Input phoneNumber and Password correctly"})
    }
};



module.exports = home;