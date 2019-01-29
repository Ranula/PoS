import axios from 'axios';

const tokens = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    console.log(axios.defaults.headers.common['Authorization']);
  }
};

export default tokens;