const fs = require('fs');
const b64 = require('base-64');
const os = require('os');
const _ = require('lodash');
const Datastore = require('nedb');
const path = require('path');
const config = require('../config');
const utils = require('../utils');

const entityName = 'absen';
const tableName = 'absen';

function createDB(pathDb){
    return new Datastore({ filename: pathDb, autoload: true, timestampData: true, afterSerialization:utils._afterSerialization, beforeDeserialization:utils._beforeDeserialization });
}
const dataStore = new Datastore();
function getDatastore(neDBDataPath, entity){
  neDBDataPath = neDBDataPath || os.tmpdir();
  var pathDb = path.join(neDBDataPath, `${entity}.db`);
  if(pathDb === dataStore.filename) return dataStore;
  else return createDB(pathDb);
}


module.exports[`${entityName}FetchAllApi`] = function (event, neDBDataPath, entity) {
  console.log(`FetchAllApi entity=${entity} path=${neDBDataPath}`);
  const responseRoute = `/${entityName}FetchAllApiResponse`;

  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, entity);
  storage.find({}, (err, doc) => {
    console.log(`FetchAllApi entity=${entity} path=${neDBDataPath} result=`, doc);
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc);
  });
};
module.exports[`${entityName}FetchAllApiGurustaff`] = function (event, neDBDataPath, entity) {
  console.log(`FetchAllApiGurustaff entity=${entity} path=${neDBDataPath}`);
  const responseRoute = `/${entityName}FetchAllApiGurustaffResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, entity);
  storage.find({}, (err, doc) => {
    console.log(`FetchAllApiGurustaff entity=${entity} path=${neDBDataPath} result=`, doc);
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc);
  });
};
module.exports[`${entityName}FetchAllApiSiswa`] = function (event, neDBDataPath, entity) {
  console.log(`FetchAllApiSiswa entity=${entity} path=${neDBDataPath}`);
  const responseRoute = `/${entityName}FetchAllApiSiswaResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, entity);
  storage.find({}, (err, doc) => {
    console.log(`FetchAllApiSiswa entity=${entity} path=${neDBDataPath} result=`, doc);
    // event.sender.send(responseRoute, err, JSON.stringify(doc));
    event.sender.send(responseRoute, err, doc);
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
function delete_photo(photoPath) {
  if (fs.existsSync(photoPath)) {
    fs.unlinkSync(photoPath);
  }
}
function set_new_photo_path(photoPath, neDBDataPath) {
  let newPath = '';
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  // if (fs.existsSync(photoPath)) {
      // Do something
      //fs.unlinkSync(photoPath);
      const photoPathSplit = photoPath.split('/');
      const photoName = photoPathSplit[photoPathSplit.length - 1];
      const photoNameSplit = photoName.split('.');
      const photoExt = photoNameSplit[photoNameSplit.length - 1];
      const newName = b64.encode(photoName);

      const now = new Date().getTime();

      newPath = path.join(neDBDataPath, `${now}-${newName}.${photoExt}`);
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
module.exports[`${entityName}CreateDataApi`] = function (event, arg1, neDBDataPath, entity) {
  // console.log(`${entityName}CreateDataApi`, arg1);
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, entity);
  const responseRoute = `/${entityName}CreateDataApiResponse`;
  const dataObj = JSON.parse(arg1);
  console.log(`${entityName}CreateDataApi dataObj`, dataObj);

  if (!dataObj.id) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "ID" tidak boleh kosong', dataObj
    );
  }
  // Using a unique constraint with the index
  // storage.ensureIndex({ fieldName: 'nip', unique: true }, err => {
  //   console.log(err);
  // });
  // storage.ensureIndex({ fieldName: 'id', unique: true }, err => {
  //   console.log(err);
  // });
  // Remove index on field somefield
    // storage.removeIndex('id', function (err) {
    // });
    // storage.removeIndex('nip');
    // storage.ensureIndex({ fieldName: 'nip', unique: true });
  storage.insert(dataObj, (err2, newDoc) => {
    // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    // console.log('err', err);
    // console.log('newDoc', newDoc);
    // ipcMain.send(responseRoute, 'berhasil input data');
    if (err2) {
      return event.sender.send(responseRoute,
        '0', `Gagal input data. msg: ${err2}`, dataObj
      );
    }
    event.sender.send(responseRoute, '1', 'berhasil input data', newDoc);
  });
};
module.exports[`${entityName}UpdateDataApi`] = function (event, arg1, _id, neDBDataPath) {
  const responseRoute = `/${entityName}UpdateDataApiResponse`;
  const dataObj = JSON.parse(arg1);
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
    storage.findOne({ _id }, (err0, doc0) => {
      if (!doc0) {
        return event.sender.send(responseRoute,
          '0', 'Gagal update data. data current tidak ditemukan.'
        );
      }
      const dataDetail = doc0; //old Data

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


      if (!dataObj.nip) {
        return event.sender.send(responseRoute,
          '0', 'Gagal input data. "NIP" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.id) {
        return event.sender.send(responseRoute,
          '0', 'Gagal input data. "ID" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.name) {
        return event.sender.send(responseRoute,
          '0', 'Gagal input data. "NAMA" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.last_name) {
        return event.sender.send(responseRoute,
          '0', 'Gagal input data. "NAMA AKHIR" tidak boleh kosong',
          updatedData
        );
      }
      if (!dataObj.jabatan) {
        return event.sender.send(responseRoute,
          '0', 'Gagal input data. "JABATAN" tidak boleh kosong',
          updatedData
        );
      }

      storage.findOne({ id: dataObj.id }, (err, doc) => {
        if (doc && dataDetail._id !== doc._id) {
          return event.sender.send(responseRoute,
            '0', `Gagal input data. ID ${doc.id} telah terpakai.`,
            updatedData
          );
        }
        storage.findOne({ nip: dataObj.nip }, (err1, doc1) => {
          if (doc1 && dataDetail._id !== doc1._id) {
            return event.sender.send(responseRoute,
              '0', `Gagal input data. nip ${doc1.nip} telah terpakai.`,
              updatedData
            );
          }
          storage.update({ _id }, { $set: dataObj }, {}, (err2, totalUpdated) => {
            // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            // console.log('err', err);
            console.log('totalUpdated', totalUpdated);
            if (err2) {
              return event.sender.send(responseRoute,
                '0', `Gagal update data. msg: ${err2}`,
                updatedData
              );
            }
            if (gantiPhoto) {
              upload_photo(dataObj.photo_path, dataObj.new_photo_path);
            }

            // const updatedData = {};
            // _.extend(updatedData, dataDetail, dataObj);

            event.sender.send(responseRoute, '1', 'berhasil update data', updatedData);
          });
        });
      });
    });
};
module.exports[`${entityName}DeleteDataApi`] = function (event, arg1, neDBDataPath) {
  const responseRoute = `/${entityName}DeleteDataApiResponse`;
  // const dataObj = JSON.parse(arg1);
  const dataObj = arg1;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
    storage.findOne({ _id: dataObj._id }, (err0, doc0) => {
      if (!doc0) {
        return event.sender.send(responseRoute,
          '0', 'Gagal delete. Data current tidak ditemukan.'
        );
      }
      const dataDetail = doc0; //old Data
      const updatedData = _.merge(dataDetail, dataObj);
      storage.remove({ _id: dataDetail._id }, {}, (err2, numRemoved) => {
        console.log('total data deleted=', numRemoved);
        if (err2) {
          return event.sender.send(responseRoute,
            '0', `Gagal delete. msg: ${err2}`,
            updatedData
          );
        }
        delete_photo(updatedData.new_photo_path);
        event.sender.send(responseRoute, '1', 'berhasil delete', updatedData);
      });
    });
};
