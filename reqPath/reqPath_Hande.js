const home = require('../all_Req_paths/home');
const about = require('../all_Req_paths/about');
const tokenHandler = require('../all_Req_paths/tokenHandler');
const checkHandler = require('../all_Req_paths/checkHandler');


const reqPath_handle = {
    home,
    about,
    token : tokenHandler,
    check : checkHandler
}

module.exports = reqPath_handle;