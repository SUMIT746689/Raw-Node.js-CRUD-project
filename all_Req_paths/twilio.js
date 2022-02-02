const https  = require('https');
const {env_twilio} = require('../environment');
const querystring = require('querystring');


const twilio = {}; 

twilio.request=(phoneNumber,msg,callback)=>{

    const number = typeof(phoneNumber)==='string' &&
    phoneNumber.trim().length === 11 ? phoneNumber.trim() : false;

    const messages = typeof(msg) ==='string' && msg.trim().length>0 && 
    msg.trim().length <=1600 ? msg.trim() : false ; 

    if(number && msg ){
        const payload = {
            Body : messages,
            From : env_twilio.fromNumber,
            To : `+88${number}`
        }

        const payloadStringify = JSON.stringify(payload);

        console.log(payloadStringify);
        
        const options = {
            hostname : 'api.twilio.com',
            method : 'GET',
            path :`/2010-04-01/Accounts/${env_twilio.account_sid}/Messages.json`,
            auth : `${env_twilio.account_sid}:${env_twilio.auth_token}`,
            headers : {
                'Content-Type' : 'applicayion/x-www-from-urlencoded',
            }
            
        }

        const req = https.request(options,(res)=>{
            callback(res.statusCode);
        });
        req.on('error',(e)=>{
            callback(e);
        })
        req.write(payloadStringify);
        req.end();
    
    }
    else{
        callback({err : "There is no value"});
    }

}

module.exports = twilio.request ;