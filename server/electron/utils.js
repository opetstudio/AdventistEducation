const b64 = require('base-64');

module.exports._afterSerialization = function(opt){
  // opt = cipherHelper(ID_KEY,opt);
  // console.log('_afterSerialization', opt);
  opt = new Buffer(opt).toString('base64');
  //encode
  // opt = b64.encode(opt);
  // console.log('_afterSerialization enc', opt);

  return opt;
}
module.exports._beforeDeserialization = function(opt){
  // opt = decipherHelper(ID_KEY,opt);
  // opt = cipherHelper(ID_KEY,opt);
  opt = new Buffer(opt, 'base64').toString('ascii');
  // opt = b64.decode(opt);
  // console.log('_beforeDeserialization', opt);
  // opt = b64.decode(opt);
  // console.log('_beforeDeserialization dec', opt);
  return opt;
}
