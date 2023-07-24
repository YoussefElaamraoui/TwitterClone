// all Axios requests using that instance will automatically include the token in their headers.

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL to match your API's URL
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export default instance;