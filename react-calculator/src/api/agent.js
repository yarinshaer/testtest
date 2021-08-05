import axios from 'axios';

const envUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = `${envUrl}api`;

//setting up a common request...
const responseBody = (response) => response?.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  get: (url, request) => axios.get(url, request).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Calculation = {
    add: (calculation) => requests.post('calculator', calculation),
    getHistory: () => requests.get('calculator'),
    delete: (id) => requests.del(`calculator/${id}`),
    details: (id) => requests.get(`calculator/${id}`),
    update: (id, values) => requests.put(`calculator/${id}`, values),
}

export default {
    Calculation,
}