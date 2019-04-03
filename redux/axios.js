import axios from 'axios';

const instance = axios.create();

// instance.defaults.baseURL = 'https://questionnaire-test-api.herokuapp.com/';
instance.defaults.baseURL = 'http://localhost:3001/';

export default instance;
