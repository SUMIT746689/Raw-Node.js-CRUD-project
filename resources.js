//Object create for resources 
const resources = {} ;

resources.createToken = (tokenLength)=>{
    const value = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
    let token = '' ;
    if(tokenLength > 0){
        for(let i = 0;i < tokenLength;i++){
            const randomNumber = Math.floor(Math.random()*value.length);
            token += value[randomNumber];
        }
        return token ;
    }
    else{
        return token ;
    }
}



module.exports = resources ;