const handleAbout = require('./allSuccessPath/handleAbout');
const handleCheak = require('./allSuccessPath/handleCheak');
const handleToken = require('./allSuccessPath/handleToken');

const pathHandler = {
    about : handleAbout.about,
    token : handleToken.token,
    cheak : handleCheak.cheak,
};

module.exports = pathHandler ;