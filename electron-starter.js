
const electron = require('electron');
// const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
// const Menu = require('menu');
const ipcMain = electron.ipcMain;
// const remote = electron.remote;
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
// const BrowserWindow = require('browser-window');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const env = process.env.NODE_ENV || 'production';
// const env = 'production';

// document.getElementById('close-btn').addEventListener('click', function (e) {
//        var window = remote.getCurrentWindow();
//        window.close();
//   });

const path = require('path');
const url = require('url');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


const installExtensions = () => {
  // installExtension(REACT_DEVELOPER_TOOLS)
  //     .then((name) => console.log(`Added Extension:  ${name}`))
  //     .catch((err) => console.log('An error occurred: ', err));
  // installExtension(REDUX_DEVTOOLS)
  //     .then((name) => console.log(`Added Extension:  ${name}`))
  //     .catch((err) => console.log('An error occurred: ', err));
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};
function createWindow() {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
     installExtensions();
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1120, height: 800, frame: false, minWidth: 800, minHeight: 800 });
  // and load the index.html of the app.
  if (env === 'production') {
    mainWindow.loadURL(url.format({
      // pathname: path.join(__dirname, 'public/index.desktop.html'),
      pathname: path.join(__dirname, 'build/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('message', 'Hello second window!');
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Create the Application's main menu
    const template = [{
        label: 'Application',
        submenu: [
            { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
            { type: 'separator' },
            { label: 'Quit', accelerator: 'Command+Q', click: () => { app.quit(); } }
        ] }, {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ] }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Make method externaly visible
exports.pong = arg => {
    //Print 6
    console.log(arg);
};
const route_users = require('./server/electron/routes/UsersRoute');
const route_user = require('./server/electron/routes/UserRoute');
const route_absen = require('./server/electron/routes/AbsenRoute');
const route_siswa = require('./server/electron/routes/SiswaRoute');
const route_util = require('./server/electron/routes/UtilRoute');
const route_gurustaff = require('./server/electron/routes/GurustaffRoute');

ipcMain.on('/user-detail', route_users.userDetail);
ipcMain.on('/save-user', route_users.saveUser);
// ipcMain.on('/save-absen', route_absen.saveAbsen);

//students
ipcMain.on('/save-siswa', route_siswa.saveSiswa);
ipcMain.on('/update-siswa', route_siswa.updateSiswa);
ipcMain.on('/fetchAllDataSiswaApi', route_siswa.fetchAllDataSiswaApi);
// ipcMain.on('/fetchAllDataAbsenSiswaApi', route_absen.fetchAllDataAbsenSiswaApi);
// ipcMain.on('/fetchAllDataAbsenGuruApi', route_absen.fetchAllDataAbsenGuruApi);
ipcMain.on('/siswaDeleteDataApi', route_siswa.siswaDeleteDataApi);

//util
ipcMain.on('/openImageApi', route_util.openImageApi);
ipcMain.on('/closeImageApi', route_util.closeImageApi);


function routeOne(routeName, theRoute) {
  ipcMain.on(`/${routeName}`, theRoute[routeName]);
}

function route(entityName, theRoute) {
  routeOne(`${entityName}CreateDataApi`, theRoute);
  routeOne(`${entityName}UpdateDataApi`, theRoute);
  routeOne(`${entityName}DeleteDataApi`, theRoute);
  routeOne(`${entityName}FetchAllApi`, theRoute);
  if (entityName === 'absen') {
    routeOne(`${entityName}FetchAllApiGurustaff`, theRoute);
    routeOne(`${entityName}FetchAllApiSiswa`, theRoute);
  }
}

route('gurustaff', route_gurustaff);
route('absen', route_absen);
route('user', route_user);
// route('absen', route_absen);
