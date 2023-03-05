const crypto = require('crypto')

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');
    hash.update(inputs.join(''));
    return hash.digest('hex');
}


result = cryptoHash('hello', 'world');


module.exports = {cryptoHash};