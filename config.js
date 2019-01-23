if (!process.browser) {
  require('dotenv').config();
}

const env = process.env.NODE_ENV || 'development';
const isDev = env !== 'production';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000/';
const apiUrl = `${baseUrl}api/`;
const dbUri = process.env.DB_URI || 'mongodb://test:142536@cluster0-shard-00-00-5ay32.mongodb.net:27017,cluster0-shard-00-01-5ay32.mongodb.net:27017,cluster0-shard-00-02-5ay32.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const port = process.env.PORT || 3000;
const jwtKey = process.env.JWT_KEY || 'lorem-ipsum';

module.exports = {
  baseUrl,
  apiUrl,
  dbUri,
  port,
  jwtKey,
  isDev,
};
