//depentdies
const handleCrud = require('../../handleCrud');
const handleToken = require('./handleToken');

const handleAbout = {}

handleAbout.about =(reqMethods,callReturn)=>{
    const methods = ['post','get','put','delete'];
    if(methods.indexOf(reqMethods.method)>-1){
        handleAbout._user[reqMethods.method](reqMethods,callReturn);
    }
    console.log(reqMethods.method);
     
};

//create a object for user crud ;
handleAbout._user = {};

handleAbout._user.post = (reqMethods,callReturn) =>{

    const firstName = typeof reqMethods.body.firstName === 'string'
    && reqMethods.body.firstName.trim().length >0
    ? reqMethods.body.firstName : false ;

    const lastName = typeof reqMethods.body.lastName === 'string'
    && reqMethods.body.lastName.trim().length >0
    ? reqMethods.body.lastName : false ;

    const phoneNumber = typeof reqMethods.body.phoneNumber === 'string'
    && reqMethods.body.phoneNumber.trim().length === 11
    ? reqMethods.body.phoneNumber : false ;

    const password = typeof reqMethods.body.password === 'string'
    && reqMethods.body.password.trim().length >0
    ? reqMethods.body.password : false ;

    const toAgreement = typeof reqMethods.body.toAgreement === 'boolean'
    ? reqMethods.body.toAgreement : false ;

    let datas= {
        firstName,
        lastName,
        phoneNumber,
        password,
        toAgreement,
    }
   
    handleCrud.read('user',phoneNumber,(err,data)=>{
    
    if(err && !data){
            handleCrud.create('user',phoneNumber,datas,(err1)=>{
                if(!err1){
                    callReturn(200);
                }
                else{
                    console.log(err1);
                    callReturn(400);
                }
            });
        }
        else{
            callReturn(405);
        }
    });
 };

handleAbout._user.get = (reqMethods,callReturn)=>{

    const phoneNumber = typeof reqMethods.body.phoneNumber === 'string'
    && reqMethods.body.phoneNumber.trim().length === 11
    ? reqMethods.body.phoneNumber : false ;

    const tokenId =typeof reqMethods.query.id === 'string' &&
    reqMethods.query.id.trim().length === 20 ? reqMethods.query.id : false ;

    handleToken._token.varify(tokenId,phoneNumber,(isVarify)=>{
        console.log(isVarify)
        if(isVarify){
            handleCrud.read('user',phoneNumber,(err,data)=>{
                if(!err){
                    callReturn(err,data);
                }
                else{
                    callReturn(405,JSON.stringify({"error":"This is a error"}));
                }
            });
        }
        else{
            callReturn(403,JSON.stringify({"error":"Varify is False"}));
        }
    })   
} ;

handleAbout._user.put = (reqMethods,callReturn)=>{

    const firstName = typeof reqMethods.body.firstName === 'string'
    && reqMethods.body.firstName.trim().length >0
    ? reqMethods.body.firstName : false ;

    const lastName = typeof reqMethods.body.lastName === 'string'
    && reqMethods.body.lastName.trim().length >0
    ? reqMethods.body.lastName : false ;

    const phoneNumber = typeof reqMethods.body.phoneNumber === 'string'
    && reqMethods.body.phoneNumber.trim().length === 11
    ? reqMethods.body.phoneNumber : false ;

    const password = typeof reqMethods.body.password === 'string'
    && reqMethods.body.password.trim().length >0
    ? reqMethods.body.password : false ;

    const tokenId =typeof reqMethods.query.id === 'string' &&
    reqMethods.query.id.trim().length === 20 ? reqMethods.query.id : false ;

    handleToken._token.varify(tokenId,phoneNumber,(isVarify)=>{
        if(isVarify ){
            handleCrud.read('user',phoneNumber,(err,data)=>{
                if(!err){
                    let datas = JSON.parse(data);
                    if(firstName || lastName || password){
                        if(firstName){
                            datas.firstName = firstName ;
                        }
                        if(lastName){
                            datas.lastName = lastName ;
                        }
                        if(password){
                            datas.password = password ;
                        }
                        
                        handleCrud.update('user',phoneNumber,datas,(err)=>{
                            if(!err){
                                callReturn(200,JSON.stringify(datas));
                            }
                            else{
                                callReturn(400);
                            }
                        });
                    }
                    else{
                        callReturn(402);
                        console.log(err)
                    }
                }
                else{
                    callReturn(403);
                    console.log(err);
                }
            });
        }
        else{
            callReturn(404);
            console.log('not any id ');
        }    
    });
    
};

handleAbout._user.delete = (reqMethods,callReturn)=>{
    phoneNumber =typeof reqMethods.body.phoneNumber === 'string' &&
    reqMethods.body.phoneNumber.trim().length === 11 ? reqMethods.body.phoneNumber : false ;

    const tokenId =typeof reqMethods.query.id === 'string' &&
    reqMethods.query.id.trim().length === 20 ? reqMethods.query.id : false ;

    handleToken._token.varify(tokenId,phoneNumber,(isVarify)=>{
        if(isVarify){
            handleCrud.read('user',phoneNumber,(err,data)=>{
                if(!err){
                    handleCrud.delete('user',phoneNumber,(err)=>{
                        if(!err){
                            callReturn(200);
                        }
                        else{
                            callReturn(400);
                        }
                    })
                }
                else{
                    callReturn(404);
                    console.log(err);
                }
            });
        }
        else{
            callReturn(403,JSON.stringify({error : "Not Varify for DELETE"}))
        }
    })
    
    
};

module.exports = handleAbout ;