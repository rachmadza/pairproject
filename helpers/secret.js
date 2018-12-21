const crypto = require('crypto');

function secretCode() {

  let random = Math.random().toString(36).substring(6);

  return random;
}

function hash(pwd) {
  const secret = secretCode();
  const hash = crypto.createHmac('sha256', secret)
    .update(pwd)
    .digest('hex');
    
  let data = {
    secret: secret,
    hash: hash
  }
  return data;
}

module.exports = hash;