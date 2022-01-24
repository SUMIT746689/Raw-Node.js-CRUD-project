//dependencies
const https = require('https');
const querystring = require('querystring');

//environment 
const twilio = {
    fromPhone : '01814292958',
    accountsId : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken : '9455e3eb3109edc12e3d8c92768f7a67'
}

//module scaffolding
const notification = {}

notification.sendTwiliosms = (phone,msg,callBack)=>{
    const userPhone = typeof(phone) === 'string'
    && phone.trim().length === 11 ? phone : false ;

    const userMsg = typeof(msg) === 'string'
    && msg.trim().length <= 1600 ? msg : false ;
    
    if(userPhone && userMsg){
        const payload = {
            From : twilio.fromPhone,
            To : `+88${userPhone}`,
            Body : userMsg,
        };
        const stringifyPayload = querystring.stringify(payload);
        
        const requestDetailes = {
            hostName : 'api.twilio.com',
            method : 'POST',
            path : `2010-04-01/Accounts/${twilio.accountsId}/Messages.json`,
            auth : `${twilio.accountsId}:${twilio.authToken}`,
            headers : {
                'Content-Type' : 'application/x-www-url-urlencoded', 
            }
        };
        const req = https.request(requestDetailes,(res)=>{
            const status = res.statusCode ;
            if(status === 200 || status === 201){
                callBack(false);
            }
            else{
                callBack(`Status Code Return was ${req}`)
            }
        });
        req.on('error',(e)=>{
            callBack(e);
        });
        req.write(stringifyPayload);
        req.end();
    }
    else{
        callBack('')
    }
    
}

module.exports = notification.sendTwiliosms ;