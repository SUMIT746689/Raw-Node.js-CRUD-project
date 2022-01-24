//
const crypto = require('crypto');
const environment = require('../environment');


const utilities ={};

utilities.parseJSON=(realData)=>{
    let value ; 
   try{
       return JSON.parse(realData);
   }
   catch{
        value={}
   }
   return value ;
} 
//hashing 
utilities.hash =(password)=>{
    console.log(typeof password);
    if(typeof password === 'string' && password.length >0 ){
        console.log(environment);
        let hashing = crypto.createHmac('sha256',environment.secretKey)
        .update(password)
        .digest('hex');
    
        return hashing;
    }
    else{
        return {};
    }
}
//token Create 
utilities.token = (tokenLength)=>{
    const allItem = 'abcdrfghijklmnopqrst1234567890';
    
    let tokens = '';
    for(i=0;i<=tokenLength-1;i++){
        const math = Math.floor(Math.random()*(allItem.length-1));
        tokens +=allItem[math];
    }
    
    return tokens ;
}
module.exports = utilities ;