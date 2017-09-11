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

module.exports.saveSiswa = function (event, arg1, neDBDataPath) {
  console.log('saveSiswa==>', arg1);

  const storage = new Datastore({ filename: `${neDBDataPath}siswa.db`, autoload: true });
  // Using a unique constraint with the index
  // storage.ensureIndex({ fieldName: 'nis', unique: true }, err => {
  //   console.log(err);
  // });
  // storage.ensureIndex({ fieldName: 'id', unique: true }, err => {
  //   console.log(err);
  // });
  // Remove index on field somefield
    storage.removeIndex('id', function (err) {
    });
    storage.removeIndex('nis', function (err) {
    });
  storage.insert(JSON.parse(arg1), (err, newDoc) => {
    // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log('err', err);
    console.log('newDoc', newDoc);
    // ipcMain.send('/save-siswa-response', 'berhasil input data');
    event.sender.send('/save-siswa-response', '1', 'berhasil input data');
  });
};
