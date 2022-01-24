//Dependencies 
const {StringDecoder} = require('string_decoder');
const url = require('url');
const pathHandler = require('./handlePath/handleSucessFile');
const erorrHandle = require('./handlePath/erorrHandle');

//Create a obj for req res Handle 
const handleReqRes =(req,res)=>{
    const method = req.method.toLowerCase();
    const header = req.headers;
    const parseUrl = url.parse(req.url,true);
    const path = parseUrl.pathname.replace('/','') ;
    const decode = new StringDecoder('utf8');
    const query = parseUrl.query ;

    let data = '';

    const reqMethods = {
        header,
        method,
        header,
        parseUrl,
        path,
        query
    };
    const selectPath = pathHandler[path] ? pathHandler[path] : erorrHandle ;

   
    req.on('data',chunk=>{
        data += decode.write(chunk) ;
        
    })
    
    req.on('end',()=>{
        data += decode.end();
        reqMethods.body = JSON.parse(data) ;
        
        
        selectPath(reqMethods,(statusCode,data)=>{
            const statusCodes = statusCode ? statusCode : 200 ;
            const datas = data ? data : '' ;
            res.writeHead(statusCodes);
            res.end(datas);
        });
        
    });
} ;

module.exports = handleReqRes ;