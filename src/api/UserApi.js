// let remote = null;
import fetch from 'isomorphic-fetch';

let ipcRenderer = {
  send: () => {},
  on: () => {}
};
const entityName = 'user';
let server = '';
// window && window.process && window.process.type
if (window.require) {
    ipcRenderer = window.require('electron').ipcRenderer;
    server = 'electron';
}
//CREATE
export const createDataApi = (data, neDBDataPath, entity) =>
  new Promise((resolve) => {
    console.log('createDataApi');
    if (ipcRenderer !== null) {
        console.log('UserApi send data');
        ipcRenderer.send(`/${entityName}CreateDataApi`, data, neDBDataPath, entity);
        ipcRenderer.on(`/${entityName}CreateDataApiResponse`, (event, status, message, newDoc) => {
            // console.log(message); // logs out "Hello second window!"
            if (status === '1') {
                console.log('UserApi send data success');
                resolve({ status: true, message, newDoc });
            } else {
              console.log('UserApi send data failed, ', message);
              resolve({ status: false, message, newDoc });
            }
        });
    } else {
      resolve({ status: false, message: 'internal error.', data });
    }
  });
//READ
export const fetchAllApi = (neDBDataPath, entity) =>
  new Promise((resolve) => {
    const routeName = `/${entityName}FetchAllApi`;
    const resp = (o) => {
      resolve(o);
    };
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(subreddit, json)))
    if(server === 'electron'){
      ipcRenderer.send(routeName, neDBDataPath, entity);
      ipcRenderer.on(`${routeName}Response`, (event, e, o) => resp({ e, o }));
    }
    else{
      fetch(`/${entityName}FetchAllApi`).then(response => {
        console.log(response);
        resp();
      });
    }
  });
export const fetchAllApiGurustaff = (neDBDataPath, entity) =>
  new Promise((resolve) => {
    const resp = (o) => {
      resolve(o);
    };


    if (ipcRenderer !== null) {
        ipcRenderer.send(`/${entityName}FetchAllApiGurustaff`, neDBDataPath, entity);
    }
    ipcRenderer.on(`/${entityName}FetchAllApiGurustaffResponse`, (event, e, o) => {
        console.log(`FetchAllApiGurustaffResponse o=${entity}`, o);
        resp({ e, o });
    });
  });
export const fetchAllApiSiswa = (neDBDataPath, entity) =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send(`/${entityName}FetchAllApiSiswa`, neDBDataPath, entity);
    }
    ipcRenderer.on(`/${entityName}FetchAllApiSiswaResponse`, (event, e, o) => {
        console.log(`FetchAllApiSiswaResponse o=${entity}`, o);
        resolve({ e, o });
    });
  });
//UPDATE
export const updateDataApi = (data, _id, neDBDataPath) =>
  new Promise((resolve) => {
    if (ipcRenderer !== null) {
        ipcRenderer.send(`/${entityName}UpdateDataApi`, data, _id, neDBDataPath);
    }
    ipcRenderer.on(`/${entityName}UpdateDataApiResponse`, (event, status, message, updatedData) => {
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
        ipcRenderer.send(`/${entityName}DeleteDataApi`, data, neDBDataPath);
    }
    ipcRenderer.on(`/${entityName}DeleteDataApiResponse`, (event, status, message, updatedData) => {
        // console.log(message); // logs out "Hello second window!"
        if (status === '1') {
            resolve({ status: true, message, updatedData });
        } else {
            resolve({ status: false, message, updatedData });
        }
    });
  });

//OTHERS
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
