// const os = require('os');
// const electron = require('electron');
const fs = require('fs');
// const b64 = require('base-64');
// const _ = require('lodash');
const appRoot = require('app-root-path');
// // os.platform()
// // console.log('oooooossssss====>', os.platform());
// // 'aix'
// // 'darwin'
// // 'freebsd'
// // 'linux'
// // 'openbsd'
// // 'sunos'
// // 'win32'
// const Datastore = require('nedb');
//
// const ipcMain = electron.ipcMain;
module.exports.openImageApi = function (event, photoPath) {
  console.log('openImageApi==>', photoPath);
  // console.log('appRoot==>', appRoot);
  if (fs.existsSync(photoPath)) {
    console.log('image ready');
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
    console.log('image not ready');
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
