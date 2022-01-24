const handleCrud =require("../../handleCrud");
const resources = require("../../resources");
const handleToken = require("./handleToken");

//create a global object
const handleCheak = {} ;

handleCheak.cheak = (reqMethods,callReturn) =>{
    const methods = ["get","post","put","delete"] ;
    if(methods.indexOf(reqMethods.method)>-1){
        handleCheak._cheak[reqMethods.method](reqMethods,callReturn);
    }
};

handleCheak._cheak = {};

handleCheak._cheak.post = (reqMethods,callReturn) =>{
    const method = typeof reqMethods.body.method === 'string'
    && ["post","get","put","delete"].indexOf(reqMethods.body.method) >-1 ? reqMethods.body.method : false ;

    const url = typeof reqMethods.body.url === 'string'
    && reqMethods.body.url.trim().length > 0 ? reqMethods.body.url : false ;

    const protocol = typeof reqMethods.body.protocol === 'string' 
    && ["http","https"].indexOf(reqMethods.body.protocol) > -1 ? reqMethods.body.protocol : false ;
    
    const successCodes = typeof reqMethods.body.successCodes === 'object' 
    && reqMethods.body.successCodes instanceof Array ? reqMethods.body.successCodes : false ;

    const timeoutSeconds = typeof reqMethods.body.timeoutSeconds === 'number'
    && reqMethods.body.timeoutSeconds % 1 === 0 && reqMethods.body.timeoutSeconds >= 1 
    && reqMethods.body.timeoutSeconds <= 5 ? reqMethods.body.timeoutSeconds : false ;
    
    if(method && url && protocol && successCodes && timeoutSeconds){
        const tokenId  = typeof reqMethods.query.token === "string"
        && reqMethods.query.token.trim().length === 20 ? reqMethods.query.token : false ;
        if(tokenId){
            handleCrud.read('token',tokenId,(err,tokenData)=>{
                if(!err){
                    const data = JSON.parse(tokenData);
                    handleCrud.read('user',data.phoneNumber,(err,userData)=>{
                        if(!err){
                            handleToken._token.varify(tokenId,data.phoneNumber,(isValid)=>{
                                if(isValid){
                                    let userObject = JSON.parse(userData);
                                    let userChecks = typeof userObject.cheaks ==='object'
                                    && userObject.cheaks instanceof Array ? userObject.cheaks : [];
                                    if(userChecks.length < 5){
                                        const cheakId = resources.createToken(20);
                                        const checkObject = {
                                            token : tokenId,
                                            phoneNumber : data.phoneNumber,
                                            protocol,
                                            url,
                                            method,
                                            successCodes,
                                            timeoutSeconds
                                        };
                                        handleCrud.create('cheak',cheakId,checkObject,(checkErr)=>{
                                            if(!checkErr){
                                                userObject.cheaks = userChecks ;
                                                userObject.cheaks.push(cheakId);

                                                handleCrud.update('user',data.phoneNumber,userObject,err=>{
                                                    if(!err){
                                                        console.log(userObject)
                                                        callReturn(200,JSON.stringify(userObject))
                                                    }
                                                    else{
                                                        callReturn(500,JSON.stringify({"err" : "problem in update object"}));
                                                    }
                                                });
                                            }
                                            else{
                                                callReturn(401,JSON.stringify({"err" : "problem in create userChecks"}));                        
                                            }
                                        })
                                    }
                                    else{
                                        callReturn(401,JSON.stringify({"err" : "user already reach in max"}));                        
                                    }
                                }
                                else{
                                    callReturn(403,JSON.stringify({"err":"problem in token Varify"}));                        
                                }
                            });
                        }
                        else{
                            callReturn(400,JSON.stringify({"err":"problem in read USER"}));                        
                    }
                    })
                }
                else{
                    callReturn(400,JSON.stringify({"err":"problem in read token"}));                        
                }
            })
        }
        else{
            console.log(reqMethods.query)
            callReturn(500,JSON.stringify({"err":"cannot find token from query"}));        
        }
    }
    else{
        callReturn(500,JSON.stringify({"err":"cannot find data From body"}));
    }
    
}
handleCheak._cheak.get = (reqMethods,callReturn) =>{
    const id = typeof reqMethods.header.id === "string"
    && reqMethods.header.id.trim().length === 20 ? reqMethods.header.id : false ;

    console.log(id);
    if(id){
        handleCrud.read('cheak',id,(err,cheakData)=>{
            if(!err && cheakData){
                const cheakDatas = JSON.parse(cheakData);

                const token = typeof cheakDatas.token === "string"
                && cheakDatas.token.trim().length === 20 ? cheakDatas.token : false ;
        
                handleToken._token.varify(cheakDatas.token,cheakDatas.phoneNumber,(isValid)=>{
                    if(isValid){
                        callReturn(200,JSON.stringify(cheakDatas));
                    }
                    else{
                     
                        callReturn(403,JSON.stringify({"ERR":"is not varified"}));                        
                    }
                });
            }
            else{
                callReturn(403,JSON.stringify({"ERR":"Problem in data read"}));            
            }
        });
    }
    else{
        callReturn(404,JSON.stringify({"ERR":"Error in get cheak Items"}));
    }
}
handleCheak._cheak.put = (reqMethods,callReturn) =>{
    const id = typeof reqMethods.body.id === 'string'
    && reqMethods.body.id.trim().length === 20 ? reqMethods.body.id : false ;
    
    const method = typeof reqMethods.body.method === 'string'
    && ["post","get","put","delete"].indexOf(reqMethods.body.method) >-1 ? reqMethods.body.method : false ;

    const url = typeof reqMethods.body.url === 'string'
    && reqMethods.body.url.trim().length > 0 ? reqMethods.body.url : false ;

    const protocol = typeof reqMethods.body.protocol === 'string' 
    && ["http","https"].indexOf(reqMethods.body.protocol) > -1 ? reqMethods.body.protocol : false ;
    
    const successCodes = typeof reqMethods.body.successCodes === 'object' 
    && reqMethods.body.successCodes instanceof Array ? reqMethods.body.successCodes : false ;

    const timeoutSeconds = typeof reqMethods.body.timeoutSeconds === 'number'
    && reqMethods.body.timeoutSeconds % 1 === 0 && reqMethods.body.timeoutSeconds >= 1 
    && reqMethods.body.timeoutSeconds <= 5 ? reqMethods.body.timeoutSeconds : false ;

    if(id){
        if(method || url || protocol || successCodes || timeoutSeconds){
            
            handleCrud.read('cheak',id,(err,cheakData)=>{
                const parseCheakData = JSON.parse(cheakData);
                
            if(!err){
                handleToken._token.varify(parseCheakData.token,parseCheakData.phoneNumber,(isValid)=>{
                    if(isValid){
                        if(method){
                            parseCheakData.method = method ; 
                        }
                        if(url){
                            parseCheakData.url = url ;
                        }
                        if(protocol){
                            parseCheakData.protocol = protocol ;
                        }
                        if(successCodes){
                            parseCheakData.successCodes = successCodes ;
                        }
                        if(timeoutSeconds){
                            parseCheakData.timeoutSeconds = timeoutSeconds ;
                        }
        
                        handleCrud.update('cheak',id,parseCheakData,(err)=>{
                            if(!err){
                                callReturn(200,JSON.stringify(parseCheakData));
                            }
                            else{
                                callReturn(403,JSON.stringify({"ERR":"Updated unsuccessful"}));                
                            }
                        });
                    }
                    else{
                        callReturn(403,JSON.stringify({"ERR":"Not Varifyed"}));
                    }
                })
            }
            else{
                callReturn(403,JSON.stringify({"ERR":"Cannot Read CheakId datas"}));                
            }
            })
        }
        else{
            callReturn(403,JSON.stringify({"ERR":"Nothing for Updated"}));        
        }
    }
    else{
        console.log(id)
        callReturn(404,JSON.stringify({"ERR":"Id is not Valid"}));
    }
}
handleCheak._cheak.delete = (reqMethods,callReturn) =>{
    const id = typeof reqMethods.header.id === "string"
    && reqMethods.header.id.trim().length === 20 ? reqMethods.header.id : false ;

    if(id){
        handleCrud.read('cheak',id,(err,cheakData)=>{
            if(!err){
                const parseCheakData = JSON.parse(cheakData);
                handleToken._token.varify(parseCheakData.token,parseCheakData.phoneNumber,(isValid)=>{
                    if(isValid){
                        handleCrud.delete('cheak',id,(err)=>{
                            if(!err){
                                handleCrud.read('user',parseCheakData.phoneNumber,(err,userData)=>{
                                    if(!err && userData){
                                        const parseUserData = JSON.parse(userData);
                                        console.log(parseUserData);
                                        parseUserData.cheaks = parseUserData.cheaks.filter((x)=> x != id);
                                        
                                        handleCrud.update('user',parseUserData.phoneNumber,parseUserData,(err)=>{
                                            if(!err){
                                                callReturn(200,JSON.stringify(parseUserData));
                                            }
                                            else{
                                                callReturn(400,JSON.stringify({"err":"facing problems in user"}));            
                                            }
                                        });
                                        
                                    }
                                    else{
                                        callReturn(401,JSON.stringify({"err":"facing problems in Get user"}));
                                    }
                                });
                            }
                            else{
                                callReturn(402,JSON.stringify({"err":"facing problems in delete"}));
                            }
                        })
                    }
                    else{
                        callReturn(403,JSON.stringify({"err":"Token not valid"}));            
                    }
                });
            }
            else{
                callReturn(404,JSON.stringify({"err":"Can not read"}));
            }
        })
    }
    else{
        callReturn(405,JSON.stringify({"err":"Id is't declare"}));
    }
}

module.exports = handleCheak ;

