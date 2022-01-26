const {create} = require('../crud_server/crud');
const { password } = require('../utilities/resources');
const resources = require('../utilities/resources'); 

const home = (req_all,status)=>{
    const methods = ['get','post','put','delete'];
    if(methods.indexOf(req_all.method)>-1){
        home.token[req_all.method](req_all,status);
    };
    console.log((methods.indexOf(req_all.method)));
};

home.token ={};
home.token.get=(req_all,status)=>{
    const phoneNumber = typeof(req_all.bufferdataParse.phoneNumber) === 'string' &&
    req_all.bufferdataParse.phoneNumber.length === 11 ? req_all.bufferdataParse.phoneNumber : false ;
    
    const firstName = typeof(req_all.bufferdataParse.firstName) === 'string' &&
    req_all.bufferdataParse.firstName.length > 0 ? req_all.bufferdataParse.firstName :false;
    
    const lastName = typeof(req_all.bufferdataParse.lastName) === 'string' &&
    req_all.bufferdataParse.lastName.length > 0 ? req_all.bufferdataParse.lastName :false;

    const toAgreement = typeof(req_all.bufferdataParse.toAgreement) === 'boolean'? req_all.bufferdataParse.toAgreement :false;
    
    const password =typeof(req_all.bufferdataParse.password) === 'string' &&
    req_all.bufferdataParse.password.length >6 ? req_all.bufferdataParse.password :false ;

    const data = {firstName,lastName,toAgreement,phoneNumber,password};

    console.log(resources.password(20))
    create(data,status);
};

home.token.post=(req_all,status)=>{};
home.token.delete=(req_all,status)=>{};
home.token.put=(req_all,status)=>{};


module.exports = home;