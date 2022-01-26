const resources = {};

resources.parseJSON=(data)=>{
    if(data){
        return JSON.parse(data);
    }
    else{
        return false;
    }
};

resources.password=(length)=>{
    const allData = '0123456789abcdefghijklmnopqrstuvwxyz';
    let password =''
    for(i=0;i<20;i++){
        const temp = allData[Math.round(Math.random()*allData.length)];
        password += temp;
    }
    return password ; 
}

module.exports =resources;