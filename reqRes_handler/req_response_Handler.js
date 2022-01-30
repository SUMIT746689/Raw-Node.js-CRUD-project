const  url = require('url');
const {StringDecoder} =require('string_decoder');
const reqPath_Handle = require('../reqPath/reqPath_Hande');
const errorPathHandle = require('../all_Req_paths/errorHandle');
const resources = require('../utilities/resources');

const decoder = new StringDecoder('utf-8'); 
const handler = {} ;

handler.reqRes = (req,res)=>{
    
    const parsePath = url.parse(req.url,true);
    const method = req.method.toLowerCase();
    const path = parsePath.pathname;
    const query = parsePath.query;
    const header =req.headers;
    const replacePath = path.replace('/','');
    let bufferData = '';

    req.on('data',(buffer)=>{
        bufferData = decoder.write(buffer); 
//        console.log(bufferData);
    });

    req.on('end',()=>{
        
        bufferData +=decoder.end();
        const bufferdataParse = resources.parseJSON(bufferData);
        const req_all = {
            method,query,header,replacePath,bufferdataParse
        }
        const pathHandle = reqPath_Handle[replacePath] ? reqPath_Handle[replacePath]: errorPathHandle; 
        pathHandle(req_all,(statuscode,message)=>{
            res.writeHead(statuscode,{'Content-type':'application/json'});
            res.write(JSON.stringify(message));
            res.end();
        });
//        console.log(reqPath_Handle[replacePath])
       

    });
    
}

module.exports = handler.reqRes;