const fs = require('fs');
const electron = require('electron');
const b64 = require('base-64');
const os = require('os');
// const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const _ = require('lodash');
const Datastore = require('nedb');
const path = require('path');
const json2csv = require('json2csv');
const XLSX = require('xlsx');

const config = require('../config');
const utils = require('../utils');

const entityName = 'gurustaff';
const tableName = 'gurustaff';

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


module.exports[`${entityName}FetchAllApi`] = function (event, neDBDataPath) {
  const responseRoute = `/${entityName}FetchAllApiResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
  console.log(path.join(neDBDataPath, `${tableName}.db`));
  storage.find({}, (err, doc) => {
    console.log('doc==>', doc);
    event.sender.send(responseRoute, err, JSON.stringify(doc));
  });
};

module.exports[`${entityName}FetchAllExportToCsvApi`] = function (event, neDBDataPath) {
  const responseRoute = `/${entityName}FetchAllExportToCsvApiResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
  console.log(path.join(neDBDataPath, `${tableName}.db`));
  storage.find({}, (err, doc) => {
    console.log('doc==>', doc);
    var fields = ['name', 'nip', 'id'];
    var nowUnixTime = new Date().getTime();
    var csv = json2csv({ data: doc, fields: fields });
    var newFile = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.csv`);
    var newFileXls = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.xlsx`);
    // var workbook = XLSX.readFile(newFileXls);
    // var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
    //   XLSX.writeFile(workbook, 'opettttt', wopts);


    // var ws = XLSX.utils.json_to_sheet([
    // {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
    // {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
    // ], {header:["S","h","e","e_1","t","J","S_1"]});
    // XLSX.writeFile(workbook, newFileXls);


                  /* original data */
                  // var data = doc;
                  var rows = [];
                  var row = [];
                  doc.forEach(function(v,k){
                    if(v){
                        row.push(v.name);
                        row.push(v.last_name);
                        row.push(v.nis);
                        row.push(v.id);
                    }
                    rows.push(row);
                  });
                  var data = doc;
                  // var data = rows;
                  // var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
                  var ws_name = "SheetJS";

                  // function Workbook() {
                  // 	if(!(this instanceof Workbook)) return new Workbook();
                  // 	this.SheetNames = [];
                  // 	this.Sheets = {};
                  // }

                  var wb = new utils.Workbook();
                  // var wb = new Workbook();
                  // var ws = sheet_from_array_of_arrays(data);
                  var xlsHeader = [
                    {d:'nama saya',k:'name'},
                    {d:'NIS',k:'nis'},
                    {d:'new_photo_path',k:'new_photo_path'},
                    {d:'NIP',k:'nip'},
                    {d:'ID',k:'id'},
                    {d:'Jabatan',k:'jabatan'}
                  ];
                  var ws = utils.sheet_from_array_of_objects(data,{header:xlsHeader});
                  // var ws = XLSX.utils.json_to_sheet([
                  //       {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
                  //       {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
                  //   ], {header:["S","h","e","e_1","t","J","S_1"]});

                  /* add worksheet to workbook */
                  wb.SheetNames.push(ws_name);
                  wb.Sheets[ws_name] = ws;
                  // var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                  // XLSX.writeFile(wb, 'opettttt', wbout);
                  // function s2ab(s) {
                  // 	var buf = new ArrayBuffer(s.length);
                  // 	var view = new Uint8Array(buf);
                  // 	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                  // 	return buf;
                  // }
                  // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx")
                  var wopts = { bookType:'xlsx', bookSST:true, type:'binary' };
                  // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
                    XLSX.writeFile(wb, newFileXls, wopts);
                    event.sender.send(responseRoute, true, `Berhasil export data ke csv. FIle csv berada di ${newFile}`);
                    // XLSX.writeFile(wb, newFileXls, wopts);




    // fs.writeFile(newFile, csv, function(err) {
    //   if (err) event.sender.send(responseRoute, false, 'Gagal export data ke csv.');
    //   return event.sender.send(responseRoute, true, `Berhasil export data ke csv. FIle csv berada di ${newFile}`);
    // });
    //export to csv
    // event.sender.send(responseRoute, true, "Berhasil export data ke csv. FIle csv berada di");

  });
};
module.exports[`${entityName}FetchAllExportToXlsxApi`] = function (event, neDBDataPath) {
  const responseRoute = `/${entityName}FetchAllExportToXlsxApiResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
  console.log(path.join(neDBDataPath, `${tableName}.db`));
  storage.find({}, (err, doc) => {
    console.log('doc==>', doc);
    var fields = ['name', 'nip', 'id'];
    var nowUnixTime = new Date().getTime();
    var csv = json2csv({ data: doc, fields: fields });
    var newFile = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.csv`);
    // var newFileXls = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.xlsx`);
    var newFileXls = path.join(os.tmpdir(), `${tableName}_${nowUnixTime}.xlsx`);
    // var workbook = XLSX.readFile(newFileXls);
    // var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
    //   XLSX.writeFile(workbook, 'opettttt', wopts);


    // var ws = XLSX.utils.json_to_sheet([
    // {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
    // {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
    // ], {header:["S","h","e","e_1","t","J","S_1"]});
    // XLSX.writeFile(workbook, newFileXls);


                  /* original data */
                  // var data = doc;
                  var rows = [];
                  var row = [];
                  doc.forEach(function(v,k){
                    if(v){
                        row.push(v.name);
                        row.push(v.last_name);
                        row.push(v.nis);
                        row.push(v.id);
                    }
                    rows.push(row);
                  });
                  var data = doc;
                  // var data = rows;
                  // var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
                  var ws_name = "SheetJS";

                  // function Workbook() {
                  // 	if(!(this instanceof Workbook)) return new Workbook();
                  // 	this.SheetNames = [];
                  // 	this.Sheets = {};
                  // }

                  var wb = new utils.Workbook();
                  // var wb = new Workbook();
                  // var ws = sheet_from_array_of_arrays(data);
                  var xlsHeader = [
                    {d:'nama saya',k:'name'},
                    {d:'NIS',k:'nis'},
                    {d:'new_photo_path',k:'new_photo_path'},
                    {d:'NIP',k:'nip'},
                    {d:'ID',k:'id'},
                    {d:'Jabatan',k:'jabatan'}
                  ];
                  var ws = utils.sheet_from_array_of_objects(data,{header:xlsHeader});
                  // var ws = XLSX.utils.json_to_sheet([
                  //       {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
                  //       {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
                  //   ], {header:["S","h","e","e_1","t","J","S_1"]});

                  /* add worksheet to workbook */
                  wb.SheetNames.push(ws_name);
                  wb.Sheets[ws_name] = ws;
                  // var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                  // XLSX.writeFile(wb, 'opettttt', wbout);
                  // function s2ab(s) {
                  // 	var buf = new ArrayBuffer(s.length);
                  // 	var view = new Uint8Array(buf);
                  // 	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                  // 	return buf;
                  // }
                  // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx")
                  var wopts = { bookType:'xlsx', bookSST:true, type:'binary' };
                  // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
                    XLSX.writeFile(wb, newFileXls, wopts);
                    shell.openExternal('file://' + newFileXls);
                    event.sender.send(responseRoute, true, `Berhasil export data ke xlsx. FIle xlsx berada di ${newFileXls}`);
                    // XLSX.writeFile(wb, newFileXls, wopts);




    // fs.writeFile(newFile, csv, function(err) {
    //   if (err) event.sender.send(responseRoute, false, 'Gagal export data ke csv.');
    //   return event.sender.send(responseRoute, true, `Berhasil export data ke csv. FIle csv berada di ${newFile}`);
    // });
    //export to csv
    // event.sender.send(responseRoute, true, "Berhasil export data ke csv. FIle csv berada di");

  });
};
module.exports[`${entityName}FetchAllExportToPdfApi`] = function (event, neDBDataPath) {
  const responseRoute = `/${entityName}FetchAllExportToPdfApiResponse`;
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);
  console.log(path.join(neDBDataPath, `${tableName}.db`));
  storage.find({}, (err, doc) => {
    console.log('doc==>', doc);
    var fields = ['name', 'nip', 'id'];
    var nowUnixTime = new Date().getTime();
    // var csv = json2csv({ data: doc, fields: fields });
    // var newFile = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.csv`);
    // var newFileXls = path.join(neDBDataPath, `${tableName}_${nowUnixTime}.xlsx`);
    var pdfPath = path.join(os.tmpdir(), `${tableName}_${nowUnixTime}.pdf`);
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.printToPDF({}, function(error, data){
      if(error) return event.sender.send(responseRoute, false, error.message);
      fs.writeFile(pdfPath, data, function(err){
        if(err) return event.sender.send(responseRoute, false, err.message);
        shell.openExternal('file://' + pdfPath);
        event.sender.send(responseRoute, true, `Berhasil export data ke pdf. FIle pdf berada di ${pdfPath}`);
      });
    });
    // var workbook = XLSX.readFile(newFileXls);
    // var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
    //   XLSX.writeFile(workbook, 'opettttt', wopts);


    // var ws = XLSX.utils.json_to_sheet([
    // {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
    // {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
    // ], {header:["S","h","e","e_1","t","J","S_1"]});
    // XLSX.writeFile(workbook, newFileXls);


                  /* original data */
                  // var data = doc;
                  // var rows = [];
                  // var row = [];
                  // doc.forEach(function(v,k){
                  //   if(v){
                  //       row.push(v.name);
                  //       row.push(v.last_name);
                  //       row.push(v.nis);
                  //       row.push(v.id);
                  //   }
                  //   rows.push(row);
                  // });
                  // var data = doc;
                  // // var data = rows;
                  // // var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
                  // var ws_name = "SheetJS";
                  //
                  // // function Workbook() {
                  // // 	if(!(this instanceof Workbook)) return new Workbook();
                  // // 	this.SheetNames = [];
                  // // 	this.Sheets = {};
                  // // }
                  //
                  // var wb = new utils.Workbook();
                  // // var wb = new Workbook();
                  // // var ws = sheet_from_array_of_arrays(data);
                  // var xlsHeader = [
                  //   {d:'nama saya',k:'name'},
                  //   {d:'NIS',k:'nis'},
                  //   {d:'new_photo_path',k:'new_photo_path'},
                  //   {d:'NIP',k:'nip'},
                  //   {d:'ID',k:'id'},
                  //   {d:'Jabatan',k:'jabatan'}
                  // ];
                  // var ws = utils.sheet_from_array_of_objects(data,{header:xlsHeader});
                  // // var ws = XLSX.utils.json_to_sheet([
                  // //       {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
                  // //       {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
                  // //   ], {header:["S","h","e","e_1","t","J","S_1"]});
                  //
                  // /* add worksheet to workbook */
                  // wb.SheetNames.push(ws_name);
                  // wb.Sheets[ws_name] = ws;
                  // // var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                  // // XLSX.writeFile(wb, 'opettttt', wbout);
                  // // function s2ab(s) {
                  // // 	var buf = new ArrayBuffer(s.length);
                  // // 	var view = new Uint8Array(buf);
                  // // 	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                  // // 	return buf;
                  // // }
                  // // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx")
                  // var wopts = { bookType:'xlsx', bookSST:true, type:'binary' };
                  // // var worksheet = XLSX.utils.table_to_book(document.getElementById('tableau'));
                  //   XLSX.writeFile(wb, newFileXls, wopts);
                  //   event.sender.send(responseRoute, true, `Berhasil export data ke xlsx. FIle xlsx berada di ${newFileXls}`);
                  //   // XLSX.writeFile(wb, newFileXls, wopts);




    // fs.writeFile(newFile, csv, function(err) {
    //   if (err) event.sender.send(responseRoute, false, 'Gagal export data ke csv.');
    //   return event.sender.send(responseRoute, true, `Berhasil export data ke csv. FIle csv berada di ${newFile}`);
    // });
    //export to csv
    // event.sender.send(responseRoute, true, "Berhasil export data ke csv. FIle csv berada di");

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
module.exports[`${entityName}CreateDataApi`] = function (event, arg1, neDBDataPath) {
  const responseRoute = `/${entityName}CreateDataApiResponse`;
  const dataObj = JSON.parse(arg1);
  neDBDataPath = neDBDataPath || config.defaultDataPath;
  const storage = getDatastore(neDBDataPath, tableName);

  if (!dataObj.nip) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "NIP" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.id) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "ID" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.name) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "NAMA" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.last_name) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "NAMA AKHIR" tidak boleh kosong', dataObj
    );
  }
  if (!dataObj.jabatan) {
    return event.sender.send(responseRoute,
      '0', 'Gagal input data. "jabatan" tidak boleh kosong', dataObj
    );
  }
  let new_photo_path = '';
  if (dataObj.photo_path !== '') {
    new_photo_path = set_new_photo_path(dataObj.photo_path, neDBDataPath);
    dataObj.new_photo_path = new_photo_path;
    upload_photo(dataObj.photo_path, new_photo_path);
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
    storage.findOne({ id: dataObj.id }, (err, doc) => {
      if (doc) {
        return event.sender.send(responseRoute,
          '0', `Gagal input data. ID ${doc.id} telah terpakai.`, dataObj
        );
      }
      storage.findOne({ nip: dataObj.nip }, (err1, doc1) => {
        if (doc1) {
          return event.sender.send(responseRoute,
            '0', `Gagal input data. NIP ${doc1.nip} telah terpakai.`, dataObj
          );
        }
        storage.insert(dataObj, (err2, newDoc) => {
          // Callback is optional
          // newDoc is the newly inserted document, including its _id
          // newDoc has no key called notToBeSaved since its value was undefined
          // console.log('err', err);
          console.log('newDoc', newDoc);
          // ipcMain.send(responseRoute, 'berhasil input data');
          if (err2) {
            return event.sender.send(responseRoute,
              '0', `Gagal input data. msg: ${err2}`, dataObj
            );
          }
          event.sender.send(responseRoute, '1', 'berhasil input data', newDoc);
        });
      });
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
