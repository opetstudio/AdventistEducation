const os = require('os');
const electron = require('electron');
const ipcMain = electron.ipcMain;
const fs = require('fs');
const b64 = require('base-64');
const _ = require('lodash');
const appRoot = require('app-root-path');
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
function upload_photo(photoPath, new_photo_path) {
  let newPath = '';
  if (fs.existsSync(photoPath)) {
      // Do something
      //fs.unlinkSync(photoPath);
      // const photoPathSplit = photoPath.split('/');
      // const photoName = photoPathSplit[photoPathSplit.length - 1];
      // const photoNameSplit = photoName.split('.');
      // const photoExt = photoNameSplit[photoNameSplit.length - 1];
      // const newName = b64.encode(photoName);

      newPath = new_photo_path;
      fs.createReadStream(photoPath).pipe(fs.createWriteStream(newPath));
  }
  return newPath;
}
function set_new_photo_path(photoPath, neDBDataPath) {
  let newPath = '';
  // if (fs.existsSync(photoPath)) {
      // Do something
      //fs.unlinkSync(photoPath);
      const photoPathSplit = photoPath.split('/');
      const photoName = photoPathSplit[photoPathSplit.length - 1];
      const photoNameSplit = photoName.split('.');
      const photoExt = photoNameSplit[photoNameSplit.length - 1];
      const newName = b64.encode(photoName);

      const now = new Date().getTime();

      newPath = `${neDBDataPath}${now}-${newName}.${photoExt}`;
      // fs.createReadStream(photoPath).pipe(fs.createWriteStream(newPath));
  // }
  return newPath;
}
module.exports.openImageApi = function (event, photoPath) {
  console.log('openImageApi==>', photoPath);
  // console.log('appRoot==>', appRoot);
  if (fs.existsSync(photoPath)) {
    fs.readFile(photoPath, (err, data) => {
       const base64data = new Buffer(data);
      //  const base64dataStr = base64data.toString('base64');
      //  console.log(base64dataStr);
      console.log('send /openImageApi-response');
       return event.sender.send('/openImageApi-response',
         '1', base64data
       );
    });
    // const photoPathSplit = photoPath.split('/');
    // const photoName = photoPathSplit[photoPathSplit.length - 1];
    // fs.createReadStream(photoPath).pipe(
    //   fs.createWriteStream(`${appRoot.path}/src/img/${photoName}`));
    // return event.sender.send('/openImageApi-response',
    //   '1', 'image ready'
    // );
  } else {
    return event.sender.send('/openImageApi-response',
      '0', 'image not ready'
    );
  }
};
module.exports.closeImageApi = function (event, photoPath) {
  console.log('closeImageApi==>', photoPath);
  if (photoPath) {
    const photoPathSplit = photoPath.split('/');
    const photoName = photoPathSplit[photoPathSplit.length - 1];
    if (fs.existsSync(photoName)) {
      // fs.unlinkSync(`${appRoot.path}/src/img/${photoName}`);
      return event.sender.send('/closeImageApi-response',
        '1', 'image closed'
      );
    }
  }

  return event.sender.send('/closeImageApi-response',
    '0', 'image not closed'
  );
};
module.exports.saveSiswa = function (event, arg1, neDBDataPath) {
  console.log('saveSiswa==>', arg1);
  const dataObj = JSON.parse(arg1);
  const storage = new Datastore({ filename: `${neDBDataPath}siswa.db`, autoload: true });
  if (!dataObj.nis) {
    return event.sender.send('/save-siswa-response',
      '0', 'Gagal input data. "NIS" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.id) {
    return event.sender.send('/save-siswa-response',
      '0', 'Gagal input data. "ID" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.name) {
    return event.sender.send('/save-siswa-response',
      '0', 'Gagal input data. "NAMA" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.last_name) {
    return event.sender.send('/save-siswa-response',
      '0', 'Gagal input data. "NAMA AKHIR" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.kelas) {
    return event.sender.send('/save-siswa-response',
      '0', 'Gagal input data. "KELAS" tidak boleh kosong', dataObj
    );
  }
  let new_photo_path = '';
  if (dataObj.photo_path !== '') {
    new_photo_path = set_new_photo_path(dataObj.photo_path, neDBDataPath);
    dataObj.new_photo_path = new_photo_path;
    upload_photo(dataObj.photo_path, new_photo_path);
  }
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
          '0', `Gagal input data. ID ${doc.id} telah terpakai.`, dataObj
        );
      }
      storage.findOne({ nis: dataObj.nis }, (err1, doc1) => {
        if (doc1) {
          return event.sender.send('/save-siswa-response',
            '0', `Gagal input data. NIS ${doc1.nis} telah terpakai.`, dataObj
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
              '0', `Gagal input data. msg: ${err2}`, dataObj
            );
          }
          event.sender.send('/save-siswa-response', '1', 'berhasil input data', newDoc);
        });
      });
    });
};
module.exports.updateSiswa = function (event, arg1, _id, neDBDataPath) {
  console.log('updateSiswa==>', arg1);
  console.log('updateSiswa old _id==>', _id);
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
    storage.findOne({ _id }, (err0, doc0) => {
      if (!doc0) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal update data. data current tidak ditemukan.'
        );
      }
      const dataDetail = doc0;


      console.log('updateSiswa old datadetail==>', dataDetail);
      console.log('updateSiswa new datadetail==>', dataObj);
      let new_photo_path = '';
      let gantiPhoto = false;
      if (dataObj.photo_path === '') {
        //set new path
        dataObj.new_photo_path = dataDetail.new_photo_path;
        dataObj.photo = dataDetail.photo;
        dataObj.photo_path = dataDetail.photo_path;
        new_photo_path = dataDetail.new_photo_path;
      } else {
        gantiPhoto = true;
        new_photo_path = set_new_photo_path(dataObj.photo_path, neDBDataPath);
        console.log('ganti photo ==>', dataObj.photo_path);
        dataObj.new_photo_path = new_photo_path;
      }

      const updatedData = _.merge(dataDetail, dataObj);


      if (!dataObj.nis) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal input data. "NIS" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.id) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal input data. "ID" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.name) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal input data. "NAMA" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.last_name) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal input data. "NAMA AKHIR" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.kelas) {
        return event.sender.send('/update-siswa-response',
          '0', 'Gagal input data. "KELAS" tidak boleh kosong',
          updatedData
        );
      }

      storage.findOne({ id: dataObj.id }, (err, doc) => {
        if (doc && dataDetail._id !== doc._id) {
          return event.sender.send('/update-siswa-response',
            '0', `Gagal input data. ID ${doc.id} telah terpakai.`,
            updatedData
          );
        }
        storage.findOne({ nis: dataObj.nis }, (err1, doc1) => {
          if (doc1 && dataDetail._id !== doc1._id) {
            return event.sender.send('/update-siswa-response',
              '0', `Gagal input data. NIS ${doc1.nis} telah terpakai.`,
              updatedData
            );
          }
          storage.update({ _id }, { $set: dataObj }, {}, (err2, totalUpdated) => {
            // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            // console.log('err', err);
            console.log('totalUpdated', totalUpdated);
            // ipcMain.send('/save-siswa-response', 'berhasil input data');
            if (err2) {
              return event.sender.send('/update-siswa-response',
                '0', `Gagal update data. msg: ${err2}`,
                updatedData
              );
            }
            if (gantiPhoto) {
              upload_photo(dataObj.photo_path, dataObj.new_photo_path);
            }

            // const updatedData = {};
            // _.extend(updatedData, dataDetail, dataObj);

            event.sender.send('/update-siswa-response', '1', 'berhasil update data', updatedData);
          });
        });
      });
    });
};
