//Defaults
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8080/sba/api/v1';

// API Axios Get Call.
export const getData = (url) => {
    return axios.get(url);
}
// API Axios Post Call.
export const postData = (url, data) => {
    return axios.post(url, data);
}
// API Axios Put Call.
export const putData = (url, data) => {
    return axios.put(url, data);
}
// API Axios Delete Call.
export const deleteData = (url) => {
    return axios.delete(url);
}