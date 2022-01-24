//dependencies

const crud = require("../../../library/data");
const utilities = require("../../../utilities/utilities");
const homeHandle = require("./home");

const aboutHandle = {}

aboutHandle.about=(reqValue,statusCode)=>{
    const allMethod = ["post","get","put","delete"];
    if(allMethod.indexOf(reqValue.method)>-1){
        aboutHandle._user[reqValue.method](reqValue,statusCode);
    }
}

aboutHandle._user = {} ;

aboutHandle._user.post = (reqValue,statusCode)=>{
    const firstName = typeof reqValue.body.firstName === 'string'
    && reqValue.body.firstName.trim().length > 0 ? reqValue.body.firstName : false ;
    
    const lastName = typeof reqValue.body.lastName === 'string'
    && reqValue.body.lastName.trim().length > 0 ? reqValue.body.lastName : false ;
    
    const phoneNumber = typeof reqValue.body.phoneNumber === 'string'
    && reqValue.body.phoneNumber.trim().length === 11 ? reqValue.body.phoneNumber : false ;
    
    const password =typeof reqValue.body.password === 'string'
    && reqValue.body.password.trim().length > 0 ? reqValue.body.password : false ;
    
    const toAgreement = typeof reqValue.body.toAgreement === 'boolean'
     ? reqValue.body.toAgreement : false ;
    
    console.log(toAgreement)
    if(firstName && lastName && phoneNumber && password && toAgreement){
        crud.read('users',phoneNumber,(err)=>{
            if(err){
                const data = {
                    firstName,
                    lastName,
                    phoneNumber,
                    password : utilities.hash(password),
                    toAgreement
                }
                crud.create('users',phoneNumber,data,err=>{
                    console.log(err);
                });
                console.log(err);
            }
            else{
                
                console.log('File has already in this phonNumber')
            }
        })
    }
    else{
        statusCode(404);
    }
};
aboutHandle._user.get = (reqValue,statusCode)=>{
    const number =typeof reqValue.query.number === 'string' &&
    reqValue.query.number.trim().length === 11 ? reqValue.query.number : false ;

    //varify token 
    let token = typeof reqValue.header.id === 'string' ? reqValue.header.id : false ;
    
    if(number){
        homeHandle._token.verify(token,number,callback=>{
            if(callback){
                crud.read('users',number,(err2,data)=>{
                    data = utilities.parseJSON(data);
                    delete data.password ;
                    statusCode(200,data);
                });
            }
            else{
                statusCode(405);
            }
        });
    }
    else{
        statusCode(500);
    }
};
aboutHandle._user.put = (reqValue,statusCode)=>{
    const firstName = typeof reqValue.body.firstName === 'string'
    && reqValue.body.firstName.trim().length > 0 ? reqValue.body.firstName : false ;
    
    const lastName = typeof reqValue.body.lastName === 'string'
    && reqValue.body.lastName.trim().length > 0 ? reqValue.body.lastName : false ;
    
    const phoneNumber = typeof reqValue.body.phoneNumber === 'string'
    && reqValue.body.phoneNumber.trim().length === 11 ? reqValue.body.phoneNumber : false ;
    
    const password =typeof reqValue.body.password === 'string'
    && reqValue.body.password.trim().length > 0 ? reqValue.body.password : false ;
    
    

    if(phoneNumber){
    
        let token = typeof reqValue.header.id === 'string' ? reqValue.header.id : false ;
        
        homeHandle._token.verify(token,phoneNumber,callback=>{
            if(callback){
                crud.read('users',phoneNumber,(err,data)=>{
                    if(!err && data ){
                        data = utilities.parseJSON(data);
                        if(firstName || lastName || password ){
                            if(firstName){ data.firstName = firstName ;}
                            if(lastName){ data.lastName = lastName ;}
                            if(password){ data.password = utilities.hash(password) ;}
        
                            crud.create('user',phoneNumber,data,(err)=>{
                                console.log('Updated data');
                            });
                        }
                        else{
                            console.log('There is no data');
                        }
                    }
                    else{
                        statusCode(505);
                    }
                    
                });
            }
            else{
                statusCode(405);
            }
        });
    }
    else{
        statusCode(400);
    }
};

aboutHandle._user.delete = (reqValue,statusCode)=>{
    const number =typeof reqValue.query.number === 'string' &&
    reqValue.query.number.trim().length === 11 ? reqValue.query.number : false ;

    let token = typeof reqValue.header.id === 'string' ? reqValue.header.id : false ;
        
        homeHandle._token.verify(token,number,callback=>{
            if(callback){
                crud.delete('users',number,err=>{
                    console.log(err);
                })
            }
            else{
                statusCode(405);
            }
        });
};

module.exports = aboutHandle;