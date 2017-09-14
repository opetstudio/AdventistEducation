const os = require('os');
// os.platform()
// console.log('oooooossssss====>', os.platform());
// 'aix'
// 'darwin'
// 'freebsd'
// 'linux'
// 'openbsd'
// 'sunos'
// 'win32'
const Datastore = require('nedb');

module.exports.saveAbsen = function (event, arg1, neDBDataPath) {
  console.log('saveAbsen==>', arg1);

  const absensStorage = new Datastore({ filename: `${neDBDataPath}absens.db`, autoload: true });
  absensStorage.insert(JSON.parse(arg1), (err, newDoc) => {
    // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log('err', err);
    console.log('newDoc', newDoc);
  });
};

module.exports.fetchAllDataAbsenSiswaApi = function (event, neDBDataPath) {
  console.log('fetchAllDataAbsenSiswaApi==>', neDBDataPath);
  const storage = new Datastore({ filename: `${neDBDataPath}absens.db`, autoload: true });
  storage.find({}, (err, doc) => {
    // console.log('doc==>', doc);
    event.sender.send('/fetchAllDataAbsenSiswaApi-response', err, JSON.stringify(doc));
  });
};
module.exports.fetchAllDataAbsenGuruApi = function (event, neDBDataPath) {
  console.log('fetchAllDataAbsenGuruApi==>', neDBDataPath);
  const storage = new Datastore({ filename: `${neDBDataPath}absens.db`, autoload: true });
  storage.find({}, (err, doc) => {
    // console.log('doc==>', doc);
    event.sender.send('/fetchAllDataAbsenGuruApi-response', err, JSON.stringify(doc));
  });
};
