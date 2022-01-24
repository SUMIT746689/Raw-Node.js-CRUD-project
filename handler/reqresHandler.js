const erroPath = require("./pathHandle/erroPath");
const handlePath = require("./pathHandle/handlePath");
const url = require('url');
const {StringDecoder} =require('string_decoder');
const {parseJSON} = require("../utilities/utilities");
const reqresHandler ={};

reqresHandler.createReqRes =(req,res)=>{
    const parsepath = url.parse(req.url,true );
    const path = parsepath.pathname;
    const realPath = path.replace('/','');
    const method = req.method.toLowerCase();
    const query = parsepath.query;
    const decoder = new StringDecoder('utf8');
    const header = req.headers;
    console.log(header.id);
    let realData = '' ;
    const reqValue = {
        parsepath,
        path,
        realPath,
        method,
        query,
        header
    };
    //res.setHeader('Content-Type', 'text/html');
    const showPath = handlePath[realPath] ? handlePath[realPath] : erroPath ;
    req.on('data',(data)=>{
        realData += decoder.write(data);

    });
    
    req.on('end',()=>{
        realData += decoder.end();
        reqValue.body = parseJSON(realData) ;
        showPath(reqValue,(statusCode,data)=>{
            statusCode = typeof statusCode ==='number' ? statusCode : 300 ; 
            data = typeof data ==='object' ? data : {};
            console.log(data,statusCode);
            // res.write(data,'uft8',()=>{
            //     console.log('Writing string data ... ')
            // });
            res.writeHead(statusCode);
            
            
        });
        res.end('ended'); 
    })
}

module.exports =  reqresHandler ;