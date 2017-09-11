const os = require('os');
const electron = require('electron');
const ipcMain = electron.ipcMain;
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

module.exports.fetchAllDataSiswaApi = function (event, neDBDataPath) {
  console.log('fetchAllDataSiswaApi==>', neDBDataPath);
  const storage = new Datastore({ filename: `${neDBDataPath}siswa.db`, autoload: true });
  storage.find({}, (err, doc) => {
    // console.log('doc==>', doc);
    event.sender.send('/fetchAllDataSiswaApi-response', err, JSON.stringify(doc));
  });
};

module.exports.saveSiswa = function (event, arg1, neDBDataPath) {
  console.log('saveSiswa==>', arg1);
  const dataObj = JSON.parse(arg1);
  const storage = new Datastore({ filename: `${neDBDataPath}siswa.db`, autoload: true });
  // Using a unique constraint with the index
  // storage.ensureIndex({ fieldName: 'nis', unique: true }, err => {
  //   console.log(err);
  // });
  // storage.ensureIndex({ fieldName: 'id', unique: true }, err => {
  //   console.log(err);
  // });
  // Remove index on field somefield
    // storage.removeIndex('id', function (err) {
    // });
    storage.removeIndex('nis');
    // storage.ensureIndex({ fieldName: 'nis', unique: true });
    storage.findOne({ id: dataObj.id }, (err, doc) => {
      if (doc) {
        return event.sender.send('/save-siswa-response',
          '0', `Gagal input data. ID ${doc.id} telah terpakai.`
        );
      }
      storage.findOne({ nis: dataObj.nis }, (err1, doc1) => {
        if (doc1) {
          return event.sender.send('/save-siswa-response',
            '0', `Gagal input data. NIS ${doc1.nis} telah terpakai.`
          );
        }
        storage.insert(dataObj, (err2, newDoc) => {
          // Callback is optional
          // newDoc is the newly inserted document, including its _id
          // newDoc has no key called notToBeSaved since its value was undefined
          // console.log('err', err);
          console.log('newDoc', newDoc);
          // ipcMain.send('/save-siswa-response', 'berhasil input data');
          if (err2) {
            return event.sender.send('/save-siswa-response',
              '0', `Gagal input data. msg: ${err2}`);
          }
          event.sender.send('/save-siswa-response', '1', 'berhasil input data');
        });
      });
    });
};
