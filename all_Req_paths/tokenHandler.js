const crud = require('../crud_server/crud');
const { token ,hash } = require('../utilities/resources');


const handler = (req_all,status)=>{
    const methods = ['get','post','put','delete'];
    if(methods.indexOf(req_all.method)>-1){
        handler._token[req_all.method](req_all,status);
        // handler._token.verify(req_all,'01776912033',(val)=>{
        //     status(200,{"callback":val})
        // });
    }
    else{
        status(400,{Error_message:'Method is not Exist in Server'})
    }
};

handler._token ={};

handler._token.post = (req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;

    
    if(phoneNumber && password ){
        const sequre_password = hash(password);

        crud.read('user',phoneNumber,(err,userData)=>{
            if(!err){
                if(userData.password == hash(password)){
                    const token_Id = token(20); 
                    const total_data = {
                        phoneNumber,
                        token_Id,
                        date: Date.now()+60*60000
                    };

                    crud.create('token',token_Id,total_data,(err,data)=>{
                        if(!err){
                            status(200,{message:"sucessfully create"})
                        }
                        else{
                            status(400,err);
                        }
                    });
                }
                else{
                    status(405,{err:"Password couldn't mach"});
                }
            }
            else{
                status(400,err);
            }
        })
        
    }
    else{
        status(400,{message:"This is error in Create"});
    }
};

//When get method calls
handler._token.get=(req_all,status)=>{
    const token_Id = typeof(req_all.query.token_Id) === 'string' &&
    req_all.query.token_Id.trim().length >=20 ? req_all.query.token_Id : false ;
    console.log(token_Id)
    if(token_Id){
        crud.read('token',token_Id,(err,tokenData)=>{
        
            if(!err && tokenData.date>Date.now()){
                const token_phoneNumber = typeof(tokenData.phoneNumber) === 'string' &&
                tokenData.phoneNumber.trim().length ===11 ? tokenData.phoneNumber: false ;
    
                console.log(token_phoneNumber);
                if(token_phoneNumber){
                    
                    crud.read('user',token_phoneNumber,(err,data)=>{
                        if(!err){
                            delete data.password;
                            status(200,data);
                        }
                        else{
                            status(401,err);
                        }
                    });
                }
                else{
                    status(402,{message:"This is error in crate"});
                }
            }
            else{
                status(404,{...err,"err":"time OVER "});
            }
        });
    }
    else{
        status(400,{err:"can't get any Token_id"});
    }
    
};

handler._token.put=(req_all,status)=>{
    const token_Id = typeof(req_all.query.token_Id) === 'string' &&
    req_all.query.token_Id.trim().length >=20 ? req_all.query.token_Id : false ;
    console.log(token_Id);

    if(token_Id){
        crud.read('token',token_Id,(err,tokenData)=>{
            const new_Date = Date.now();

            if(!err && tokenData.date<new_Date){
                const updatedTokenData = {...tokenData};
                updatedTokenData.date = new_Date+60*60000; 
            
                crud.update('token',token_Id,updatedTokenData,(err)=>{
                    if(!err){
                        status(200,{"success":"token update sucessfull"})
                    }
                    else{
                        status(400,{err:"can't update the token"})
                    }
                });
            }
             else{
                 status(500,{Error_Message:"Fall in problem"})
            }
        })
    }
    else{
        status(400,{Error_Message:'Can not get any token ID.'})
    }
};

handler._token.delete=(req_all,status)=>{
    const token_Id = typeof(req_all.query.token_Id) === 'string' &&
    req_all.query.token_Id.trim().length >=20 ? req_all.query.token_Id : false ;
    console.log(token_Id);

    if(token_Id){
        crud.read('token',token_Id,(err,tokenData)=>{
            if(!err && tokenData){
                crud.delete('token',token_Id,(err)=>{
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

handler._token.verify=(tokenId,phoneNumber,callback)=>{
    
    const token_Id = typeof(tokenId)==='string' &&
    tokenId.trim().length >=20 ? tokenId :false ;

    const user_phoneNumber = typeof(phoneNumber)==='string'
    && phoneNumber.trim().length===11 ? phoneNumber : false;

    if(token_Id && user_phoneNumber){

        crud.read('token',token_Id,(err,tokenData)=>{
    
            if(!err && tokenData.phoneNumber === user_phoneNumber){
                
                crud.read('user',user_phoneNumber,(err,userData)=>{
                    
                    if(!err){
                        callback(false);
                    }
                    else{
                        callback(true);
                    }

                })
            }
            else{
                callback(true);
            }
        })
    } 
    else{
        callback(true);
    }
}

module.exports = handler;