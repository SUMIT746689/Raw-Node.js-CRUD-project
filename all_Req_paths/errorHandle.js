const errorPathHandle = (req,status)=>{
    console.log('error');
    status(400,'This page is not found');
}
module.exports=errorPathHandle;