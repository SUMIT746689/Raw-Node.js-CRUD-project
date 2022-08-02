const tokenHandler = require('./tokenHandler');
const crud = require('../crud_server/crud');
const current_environment_object = require('../environment');
const {token} = require('../utilities/resources');

const checkHandler =(req_all,status)=>{
    const methods = ['get','post','put','delete'];
    if(methods.indexOf(req_all.method)>-1){
        checkHandler._check[req_all.method](req_all,status);
    }
    else{
        status('this is wrong method');
    }
};

checkHandler._check={};

checkHandler._check.post=(req_all,status)=>{

    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const protocol = typeof(req_all.bufferdataParse.protocol) === 'string' &&
    ['http','https'].indexOf(req_all.bufferdataParse.protocol) > -1 ? req_all.bufferdataParse.protocol :false;
    
    const url = typeof(req_all.bufferdataParse.url) === 'string' 
    ? req_all.bufferdataParse.url :false;

    const method = typeof(req_all.bufferdataParse.method) === 'string' &&
    ['get','post','put','delete'].indexOf(req_all.bufferdataParse.method) > -1 ? req_all.bufferdataParse.method :false;
    
    const timeOutSeconds = typeof(req_all.bufferdataParse.timeOutSeconds) === 'number' &&
    req_all.bufferdataParse.timeOutSeconds %1 === 0 && req_all.bufferdataParse.timeOutSeconds > 1 
    && req_all.bufferdataParse.timeOutSeconds <= 5 ? req_all.bufferdataParse.timeOutSeconds :false ;
    
    const successCodes = typeof(req_all.bufferdataParse.successCodes) === 'object' &&
    req_all.bufferdataParse.successCodes instanceof Array ? req_all.bufferdataParse.successCodes :false;
    
    const token_Id =typeof(req_all.header.token_id) === 'string' &&
    req_all.header.token_id.length >= 20 ? req_all.header.token_id : false ;
    
    const check_data = {phoneNumber,protocol,method,timeOutSeconds,successCodes};
    
    if(phoneNumber,url,method,timeOutSeconds,token_Id,successCodes){
        tokenHandler._token.verify(token_Id,phoneNumber,(err)=>{
            if(!err ){
                crud.read('user',phoneNumber,(err,userData)=>{
                    const copy_userData = {...userData};
                    const new_check_key = token(20);
                    check_data.new_check_key= new_check_key;
                    
                    typeof(copy_userData.check_key) === 'undefined' ? copy_userData.check_key=[]: copy_userData.check_key; 
                    
                    if(!err && copy_userData.check_key.length< current_environment_object.max_check_key){
                        console.log(copy_userData.check_key.length);
                        crud.create('check',new_check_key,check_data,(err)=>{
                            if(!err){
                                typeof(copy_userData.check_key) ==='object' &&
                               copy_userData.check_key instanceof Array ? copy_userData.check_key.push(new_check_key):false;
                                
                                crud.update('user',phoneNumber,copy_userData,(err)=>{
                                    if(!err){
                                        status(200,copy_userData);
                                    }
                                    else{
                                        status(400,{err:"Error in Updated User Data"})
                                    }
                                })
                                
                            }
                            else{
                                status(400,{err: "error to create check"})
                            }
                        })
                        
                       
                    }
                    else{
                        status(400,{err: "secret_key cannot found"});
                    }
                })
                
            }
            else{
                status(400,{err:"Can not varify"});
            }
        })
        
    }
    else{
        status(400,{err:"input right value"});
    }

};

checkHandler._check.get=(req_all,status)=>{
    const check_id = typeof(req_all.query.check_id) === 'string' &&
    req_all.query.check_id.trim().length >=20 ? req_all.query.check_id : false ;
    
    if(check_id){
        crud.read('check',check_id,(err,checkData)=>{
            if(!err && checkData){
                const token_id = typeof(req_all.header.token_id) === 'string' &&
                req_all.header.token_id.trim().length >=20 ? req_all.header.token_id : false ;
                if(token_id){
                    crud.read('token',token_id,(err,tokenData)=>{
                        if(!err){
                            tokenHandler._token.verify(token_id,checkData.phoneNumber,(err)=>{

                                if(!err){
                                    status(200,checkData);
                                }
                                else{
                                    status(400,{err:"can't varify"});
                                }

                            })
                        }
                        else{
                            status(200,{err:"token read problem"});
                        }
                    });
                    
                }
                else{
                    status(400,{err:"token Id can't found"});
                }
                
            }
            else{
                status(405,{err:"can't read check file"});
            }
        })
        const token_Id =typeof(req_all.header.token_id) === 'string' &&
        req_all.header.token_id.length >= 20 ? req_all.header.token_id : false ;
       
    }
    else{
        status(400,{err:"Input right token id"})
    }

};

checkHandler._check.put=(req_all,status)=>{
    const check_id = typeof(req_all.bufferdataParse.check_id) === 'string' &&
    req_all.bufferdataParse.check_id.trim().length >=20 ? req_all.bufferdataParse.check_id : false ;

    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const protocol = typeof(req_all.bufferdataParse.protocol) === 'string' &&
    ['http','https'].indexOf(req_all.bufferdataParse.protocol) > -1 ? req_all.bufferdataParse.protocol :false;
    
    const url = typeof(req_all.bufferdataParse.url) === 'string' 
    ? req_all.bufferdataParse.url :false;

    const method = typeof(req_all.bufferdataParse.method) === 'string' &&
    ['get','post','put','delete'].indexOf(req_all.bufferdataParse.method) > -1 ? req_all.bufferdataParse.method :false;
    
    const timeOutSeconds = typeof(req_all.bufferdataParse.timeOutSeconds) === 'number' &&
    req_all.bufferdataParse.timeOutSeconds %1 === 0 && req_all.bufferdataParse.timeOutSeconds > 1 
    && req_all.bufferdataParse.timeOutSeconds <= 5 ? req_all.bufferdataParse.timeOutSeconds :false ;
    
    const successCodes = typeof(req_all.bufferdataParse.successCodes) === 'object' &&
    req_all.bufferdataParse.successCodes instanceof Array ? req_all.bufferdataParse.successCodes :false;
    

    if(check_id && (phoneNumber || protocol || url || method || timeOutSeconds || successCodes)){
        
        crud.read('check',check_id,(err,checkData)=>{
            const copy_checkData = {...checkData};
            if(!err){
                
                const token_id = typeof(req_all.header.token_id) === 'string' &&
                req_all.header.token_id.trim().length >=20 ? req_all.header.token_id : false ;
           
                tokenHandler._token.verify(token_id,phoneNumber,(err)=>{
                    if(!err){
                        copy_checkData.phoneNumber = phoneNumber !== checkData.phoneNumber ? phoneNumber : checkData.phoneNumber; 
                        copy_checkData.protocol = protocol !== checkData.protocol ? protocol : checkData.protocol; 
                        copy_checkData.url = url !== checkData.url ? url : checkData.url; 
                        copy_checkData.timeOutSeconds = timeOutSeconds !== checkData.timeOutSeconds ? timeOutSeconds : checkData.timeOutSeconds; 
                        copy_checkData.successCodes = successCodes !== checkData.successCodes ? successCodes : checkData.successCodes; 
                        
                        crud.update('check',check_id,copy_checkData,(err)=>{
                            if(!err){
                                status(200,copy_checkData);
                            }
                            else{
                                status(400,err);
                            }    
                        })
                    }
                    else{
                        status(400,{err:"casn't read token data"})
                    }
                })
            }
            else{
                status(400,{err:"casn't read check data"})
            }
        })
    }
    else{
        status(400,{err:"Check Id can't find or can't have any value for changes"})
    }
};

checkHandler._check.delete=(req_all,status)=>{
    const check_id = typeof(req_all.query.check_id) === 'string' &&
    req_all.query.check_id.trim().length >=20 ? req_all.query.check_id : false ;
    
    if(check_id){
        crud.read('check',check_id,(err,checkData)=>{
            if(!err && checkData){
                const token_id = typeof(req_all.header.token_id) === 'string' &&
                req_all.header.token_id.trim().length >=20 ? req_all.header.token_id : false ;
                
                tokenHandler._token.verify(token_id,checkData.phoneNumber,(err)=>{
                    if(!err){
                        
                        crud.delete('check',check_id,(err)=>{
                            if(!err){
                                status(400,{Message:"Sucessfully Deleted"});
                            }
                            else{
                                status(400,{err:"Fall problem in deleted"});
                            }
                        });
                    }
                    else{
                        status(400,{err:"can't varify"});
                    }
                });
            }
            else{
                status(400,{err:"can't read check id"});
            }
        });
    }
    else{
        status(400,{err: "Give a check id in query"});
    }
};

module.exports = checkHandler;