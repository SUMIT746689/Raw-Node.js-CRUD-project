const home = require('./correctPaths/home');
const about = require('./correctPaths/about');
const aboutHandle = require('./correctPaths/about');
const homeHandle = require('./correctPaths/home');
//create a object for path 
const handlePath = {
    home : homeHandle.home,
    about : aboutHandle.about
}
module.exports = handlePath ;