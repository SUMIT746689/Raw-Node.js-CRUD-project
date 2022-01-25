const http = require('http');

const app = {}
app.server=()=>{
    const server = http.createServer(app.reqRes);
    server.listen(3000,()=>{console.log('running')});
}; 

app.reqRes=(req,res)=>{
    console.log(req.method);
    res.end('hello boy');
}


app.server();