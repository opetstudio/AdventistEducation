// let remote = null;
let ipcRenderer = null;
if (window.require) {
    // remote = window.require('electron').remote;
    ipcRenderer = window.require('electron').ipcRenderer;
    ipcRenderer.on('message', (event, message) => {
        console.log(message); // logs out "Hello second window!"
    });
    // console.log('remmmmoooooootottt===>', remote.getCurrentWindow());

    //main = remote.require('../electron-starter.js');
}

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
];

// export default () =>
//   //hit api
//   // new Promise((resolve, reject) => {
//    new Promise((resolve) => {
//     setTimeout(() => resolve(people), 3000);
//   })
// ;
export const userDetail = () =>
  new Promise((resolve) => {
    resolve(people);
  });

export const saveUser = (data) =>
  new Promise((resolve) => {
    console.log('save data user: ', data);
    if (ipcRenderer !== null) {
        ipcRenderer.send('/save-user', data);
    }

    resolve({ status: 'success', message: 'success save user' });
  });
export const saveAbsen = (data, neDBDataPath) =>
  new Promise((resolve) => {
    console.log('save data absen: ', data);
    if (ipcRenderer !== null) {
        ipcRenderer.send('/save-absen', data, neDBDataPath);
    }

    resolve({ status: 'success', message: 'success save data' });
  });
export const saveSiswa = (data, neDBDataPath) =>
  new Promise((resolve) => {
    console.log('save data siswa: ', data);
    if (ipcRenderer !== null) {
        ipcRenderer.send('/save-siswa', data, neDBDataPath);
    }
    ipcRenderer.on('/save-siswa-response', (event, status, message) => {
        // console.log(message); // logs out "Hello second window!"
        if (status === '1') {
            resolve({ status: true, message });
        } else {
          resolve({ status: false, message });
        }
    });
  });

export const fetchAllDataSiswaApi = neDBDataPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/fetchAllDataSiswaApi', neDBDataPath);
    }
    ipcRenderer.on('/fetchAllDataSiswaApi-response', (event, e, o) => {
        // console.log(message); // logs out "Hello second window!"
        console.log('e==>', e);
        console.log('o==>', o);
        resolve({ e, o: JSON.parse(o) });
    });
  });
