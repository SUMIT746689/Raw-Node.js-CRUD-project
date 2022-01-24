const http = require('http');
const fs = require('fs');
const handleReqRes = require('./handleReqRes');
const handleCrud = require('./handleCrud');
const sendTwiliosms = require('./helpers/notification');

//create a Global App object 
const App = {} ;

//todes
sendTwiliosms('','hello world !',(err)=>{
    console.log(err);
})

//create config 
App.config = {
    port : process.env.ENV_PORT
     
}
//Create a App 
App.create =()=> {
    const server = http.createServer(App.handleReqRes);
    server.listen(App.config.port,()=>{console.log('running')});
}
//create a req res handler 
App.handleReqRes = handleReqRes ;

App.create();

// handleCrud.update('user','1776912031',{name : 'Sumit'},(err)=>{
//     console.log(err);
// });

console.log(process.env.ENV_PORT);