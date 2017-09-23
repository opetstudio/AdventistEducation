// import fetch from 'isomorphic-fetch';
// let remote = null;
let ipcRenderer = {
  send: () => {},
  on: () => {}
};
let server = '';
const entityName = 'gurustaff';
// window && window.process && window.process.type
if (window.require) {
    ipcRenderer = window.require('electron').ipcRenderer;
    server = 'electron';
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
export const createDataApi = (data, neDBDataPath) =>
  new Promise((resolve) => {
    console.log('save data siswa: ', data);
    if (ipcRenderer !== null) {
        ipcRenderer.send('/gurustaffCreateDataApi', data, neDBDataPath);
    }
    ipcRenderer.on('/gurustaffCreateDataApiResponse', (event, status, message, newDoc) => {
        // console.log(message); // logs out "Hello second window!"
        if (status === '1') {
            resolve({ status: true, message, newDoc });
        } else {
          resolve({ status: false, message, newDoc });
        }
    });
  });
export const updateDataApi = (data, _id, neDBDataPath) =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/gurustaffUpdateDataApi', data, _id, neDBDataPath);
    }
    ipcRenderer.on('/gurustaffUpdateDataApiResponse', (event, status, message, updatedData) => {
        // console.log(message); // logs out "Hello second window!"
        if (status === '1') {
            resolve({ status: true, message, updatedData });
        } else {
            resolve({ status: false, message, updatedData });
        }
    });
  });
//delete
export const deleteDataApi = (data, neDBDataPath) =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/gurustaffDeleteDataApi', data, neDBDataPath);
    }
    ipcRenderer.on('/gurustaffDeleteDataApiResponse', (event, status, message, updatedData) => {
        // console.log(message); // logs out "Hello second window!"
        if (status === '1') {
            resolve({ status: true, message, updatedData });
        } else {
            resolve({ status: false, message, updatedData });
        }
    });
  });

export const fetchAllApi = neDBDataPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/gurustaffFetchAllApi', neDBDataPath);
    }
    ipcRenderer.on('/gurustaffFetchAllApiResponse', (event, e, o) => {
        // console.log(message); // logs out "Hello second window!"
        // console.log('e==>', e);
        // console.log('o==>', o);
        resolve({ e, o: JSON.parse(o) });
    });
  });
export const fetchAllExportToCsvApi = neDBDataPath =>
  new Promise((resolve) => {
    // console.log('entityName===>', entityName);
    const routeName = "/gurustaffFetchAllExportToCsvApi";
    const resp = (o) => {
      resolve(o);
    };
    if(server === 'electron'){
      if (ipcRenderer !== null) {
        ipcRenderer.send(routeName, neDBDataPath);
        ipcRenderer.on(`${routeName}Response`, (event, status, message) => { resp({ status, message }); });
      }
    }
    else{
      resp({});
    // //   fetch(routeName).then(response => {
    // //     console.log(response);
    // //     resp();
    // //   });
    }
  });
export const fetchAllExportToXlsxApi = neDBDataPath =>
  new Promise((resolve) => {
    // console.log('entityName===>', entityName);
    const routeName = `/${entityName}FetchAllExportToXlsxApi`;
    const resp = (o) => {
      resolve(o);
    };
    if(server === 'electron'){
      if (ipcRenderer !== null) {
        ipcRenderer.send(routeName, neDBDataPath);
        ipcRenderer.on(`${routeName}Response`, (event, status, message) => { resp({ status, message }); });
      }
    }
    else{
      resp({});
    // //   fetch(routeName).then(response => {
    // //     console.log(response);
    // //     resp();
    // //   });
    }
  });
export const fetchAllExportToPdfApi = neDBDataPath =>
  new Promise((resolve) => {
    // console.log('entityName===>', entityName);
    const routeName = `/${entityName}FetchAllExportToPdfApi`;
    const resp = (o) => {
      resolve(o);
    };
    if(server === 'electron'){
      if (ipcRenderer !== null) {
        ipcRenderer.send(routeName, neDBDataPath);
        ipcRenderer.on(`${routeName}Response`, (event, status, message) => { resp({ status, message }); });
      }
    }
    else{
      resp({});
    // //   fetch(routeName).then(response => {
    // //     console.log(response);
    // //     resp();
    // //   });
    }
  });
export const fetchAllDataAbsenSiswaApi = neDBDataPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/fetchAllDataAbsenSiswaApi', neDBDataPath);
    }
    ipcRenderer.on('/fetchAllDataAbsenSiswaApi-response', (event, e, o) => {
        // console.log(message); // logs out "Hello second window!"
        // console.log('e==>', e);
        // console.log('o==>', o);
        resolve({ e, o: JSON.parse(o) });
    });
  });
export const fetchAllDataAbsenGuruApi = neDBDataPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/fetchAllDataAbsenGuruApi', neDBDataPath);
    }
    ipcRenderer.on('/fetchAllDataAbsenGuruApi-response', (event, e, o) => {
        // console.log(message); // logs out "Hello second window!"
        // console.log('e==>', e);
        // console.log('o==>', o);
        resolve({ e, o: JSON.parse(o) });
    });
  });
export const openImageApi = photoPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/openImageApi', photoPath);
    }
    ipcRenderer.on('/openImageApi-response', (event, status, message) => {
        // console.log(message); // logs out "Hello second window!"
        // console.log('e==>', event);
        // console.log('o==>', o);

         const base64dataStr = message.toString('base64');
          // console.log('openImageApi-response=====>', message);
        //  resolve(base64dataStr);
        //  console.log('openImageApi-response=====>', base64dataStr);
        if (status === '1') {
            resolve({ status: true, message: base64dataStr });
        } else {
          resolve({ status: false, message });
        }
    });
  });
export const closeImageApi = photoPath =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send('/closeImageApi', photoPath);
    }
    ipcRenderer.on('/closeImageApi-response', (event, status, message) => {
        // console.log(message); // logs out "Hello second window!"
        // console.log('e==>', e);
        // console.log('o==>', o);
        if (status === '1') {
            resolve({ status: true, message });
        } else {
          resolve({ status: false, message });
        }
    });
  });
