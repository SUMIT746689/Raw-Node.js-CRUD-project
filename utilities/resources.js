const crypto = require('crypto');
const {secret_key} = require('../environment')
console.log(secret_key)
const resources = {};

resources.parseJSON=(data)=>{
    if(data){
        return JSON.parse(data);
    }
    else{
        return false;
    }
};

resources.token=(length)=>{
    const allData = '0123456789abcdefghijklmnopqrstuvwxyz';
    let password ='';
    for(i=0;i<20;i++){
        const temp = allData[Math.round(Math.random()*allData.length)];
        password += temp;
    }
    return password ; 
}

resources.hash=(password)=>{
    if(typeof(password)==='string' && password.trim().length>5){
        const hash=crypto.createHmac('sha256', secret_key)
        .update(password)
        .digest('hex');
        return hash;
    }
    else{
        return '';
    }
    
}

module.exports =resources;