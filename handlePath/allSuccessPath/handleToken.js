//depentdies
const handleCrud = require('../../handleCrud');
const resources = require('../../resources');

const handleToken = {};

handleToken.token =(reqMethods,callReturn)=>{
    const methods = ['post','get','put','delete'];
    if(methods.indexOf(reqMethods.method)>-1){
        handleToken._token[reqMethods.method](reqMethods,callReturn);
    }
    console.log(reqMethods.method);
};

//create a object for user crud ;
handleToken._token = {};

handleToken._token.post = (reqMethods,callReturn) =>{

    const phoneNumber = typeof reqMethods.body.phoneNumber === 'string'
    && reqMethods.body.phoneNumber.trim().length === 11
    ? reqMethods.body.phoneNumber : false ;

    const password = typeof reqMethods.body.password === 'string'
    && reqMethods.body.password.trim().length >0
    ? reqMethods.body.password : false ;

    let datas= {
        tokenId : resources.createToken(20),
        phoneNumber,
        expans : Date.now()+60*60*1000,
    }
    console.log(datas.expans);
    handleCrud.read('user',phoneNumber,(err,value)=>{
        const data = JSON.parse(value);
    if(!err && value && (data.password === password)){
            handleCrud.create('token',datas.tokenId,datas,(err1)=>{
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

handleToken._token.get = (reqMethods,callReturn)=>{
    console.log(reqMethods.query.id);

    const token = typeof reqMethods.query.id === 'string'
    && reqMethods.query.id.trim().length === 20 
    ? reqMethods.query.id : false ;

    if(token){
        handleCrud.read('token',token,(err,data)=>{
            if(!err && data){
                callReturn(err,data);
            }
            else{
                callReturn(405,JSON.stringify({"error":"This is a error"}));
            }
        });
    }
    else{
        callReturn(400)
    }
} ;

handleToken._token.put = (reqMethods,callReturn)=>{


    const tokenId = typeof reqMethods.query.id === 'string'
    && reqMethods.query.id.trim().length === 20
    ? reqMethods.query.id : false ;

    const extend = typeof reqMethods.body.extend === 'boolean'
    ? reqMethods.body.extend : false ;
    console.log(extend,tokenId,typeof(reqMethods.query.id));
 
    if(tokenId && extend){
        handleCrud.read('token',tokenId,(err,data)=>{
            if(!err){
                let datas = JSON.parse(data);
                if(datas.expans < Date.now()){
                    
                    datas.expans = Date.now()+60*60*1000 ;

                    handleCrud.update('token',tokenId,datas,(err)=>{
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
                    console.log('This is already expans',data,err,Date.now());
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
    }
};

handleToken._token.delete = (reqMethods,callReturn)=>{
    tokenId =typeof reqMethods.query.id === 'string' &&
    reqMethods.query.id.trim().length === 20 ? reqMethods.query.id : false ;

    if(tokenId){
        handleCrud.read('token',tokenId,(err,data)=>{
            if(!err){
                handleCrud.delete('token',tokenId,(err)=>{
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
};

handleToken._token.varify = (id,phoneNumber,callBack) =>{
    handleCrud.read('token',id,(err,data)=>{
        const datas = JSON.parse(data);
        if(!err && datas.phoneNumber === phoneNumber && datas.expans > Date.now()){
            callBack(true);
        }
        else{
            callBack(false);
        }
    });
}


module.exports = handleToken ;