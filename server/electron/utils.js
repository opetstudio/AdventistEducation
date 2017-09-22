const b64 = require('base-64');
const XLSX = require('xlsx');

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

function datenum(v, date1904) {
  if(date1904) v+=1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}
module.exports.Workbook = Workbook;
module.exports.sheet_from_array_of_arrays = function(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}
module.exports.sheet_from_array_of_objects = function(data, opts) {
  opts = opts || {};
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};

    // range.s.r = 0;
    // range.s.c = 0;
    // range.e.r = 0;
    // range.e.c = 0;
    var header_key = [];

    if(!opts.header){
      var RH = 0;
      var CH = 0;
      if(range.s.r > RH) range.s.r = RH;
      if(range.s.c > CH) range.s.c = CH;
      if(range.e.r < RH) range.e.r = RH;
      if(range.e.c < CH) range.e.c = CH;
      for(var i in data[0]){
        if(i){
          var cell = {v: i };
          var cell_ref = XLSX.utils.encode_cell({c:CH,r:RH});
          cell.t = 's';
          ws[cell_ref] = cell;
        }
        else {
          var cell = {v: '' };
          var cell_ref = XLSX.utils.encode_cell({c:CH,r:RH});
          cell.t = 's';
          ws[cell_ref] = cell;
        }
        header_key[CH] = i;
        CH++;
      }
    }
    else {
      //opts.header
      range.s.r = 0;
      range.s.c = 0;
      range.e.r = 0;
      range.e.c = 0;
      for(var i=0;i<opts.header.length;i++){
        header_key[i] = opts.header[i].k;
        var cell = {v: opts.header[i].d };
        var cell_ref = XLSX.utils.encode_cell({c:i,r:0});
        cell.t = 's';
        cell.s = {
          font: {
            bold: true
          }
        }
        ws[cell_ref] = cell;
      }
    }



  for(var R = 1; R !== data.length + 1; ++R) {
    var rowObj = data[R-1];
    var C = 0;
    for(var C=0;C<header_key.length;C++){
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: rowObj[header_key[C]] };
      if(cell.v !== null){
        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
        if(typeof cell.v === 'number') cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else if(cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = datenum(cell.v);
        }
        else cell.t = 's';
        cell.s = {
          font: {
            bold: true,
            italic: true
          },
          border:{
            bottom: {
              style: 'medium',
              color: {
                auto: 1
              }
            }
          }
        }
        ws[cell_ref] = cell;
      }
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}
