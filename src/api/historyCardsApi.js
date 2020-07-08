import axios from 'axios';

export default axios.create({
    baseURL : 'http://europe-west1-historycards-a64e0.cloudfunctions.net/api' 
});