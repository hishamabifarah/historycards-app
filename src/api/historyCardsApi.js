import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default axios.create({
    baseURL: 'http://europe-west1-historycards-a64e0.cloudfunctions.net/api',
})



// import axios from 'axios';
// import { AsyncStorage } from 'react-native';

// const instance = axios.create({
//     baseURL: 'http://europe-west1-historycards-a64e0.cloudfunctions.net/api',
// });

// instance.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config;
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// );