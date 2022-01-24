const http = require('http');
const {createReqRes} = require('./handler/reqresHandler');
const crud = require ('./library/data');

//run CRUD file
// crud.create('test','index2',{Name : "Tahmina shahaorin Rumi",Id : "183002551"},(err)=>{
//     console.log(err);
// })
// crud.read('test','index2',(arr)=>{
//     console.log(arr);
// })
// crud.update('test','index',{"Data": "My data"},(err)=>{
//     console.log(err);
// });
// crud.delete('test','index2',(err)=>{
//     console.log(err);
// })

//create a global obj
const app = {};

//App config 
app.config = {
    PORT : process.env.NODE_ENV ,
    
}
//create server 
app.createServer =()=> {
    const server = http.createServer(app.createReqRes)
    server.listen(app.config.PORT);
}
//create a req res obj 
app.createReqRes = createReqRes ;

console.log(process.env.NODE_ENV);

//run server 
app.createServer();

