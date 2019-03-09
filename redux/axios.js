import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'https://node-js-230621.appspot.com/';
// instance.defaults.baseURL = 'http://localhost:3001/';

export default instance;
