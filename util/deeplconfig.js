const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api-free.deepl.com/v2',
  headers: {
    'Authorization': 'DeepL-Auth-Key ' + process.env.DEEPL_KEY,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

module.exports = instance;
