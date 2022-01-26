"use strict";
const http = require('http');

const reqRes = require('./reqRes_handler/req_response_Handler');

const app = {}
app.reqRes= reqRes;

app.server = http.createServer(app.reqRes)
.listen(5500,()=>{console.log('running')});
