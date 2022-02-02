"use strict";
const http = require('http');
const {env_Name, PORT} = require('./environment');
const reqRes = require('./reqRes_handler/req_response_Handler');
const twilio = require('./all_Req_paths/twilio');

twilio('01776912033',"hello friend",(m)=>{
    console.log(m);
});
const app = {}
app.reqRes= reqRes;

// app.server = http.createServer(app.reqRes)
// .listen(PORT,()=>{console.log('mode : '+env_Name+', port : '+PORT+'\nrunning...')});
