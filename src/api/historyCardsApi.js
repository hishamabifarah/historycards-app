import axios from 'axios';
// import { AsyncStorage } from 'react-native';

export default axios.create({
    baseURL: 'http://europe-west1-historycards-a64e0.cloudfunctions.net/api',
})

// const getToken = async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//         console.log('token' , token);
//         return `Bearer ${token}`;
//     }
// }

// export default axios.create({
//     baseURL: 'http://europe-west1-historycards-a64e0.cloudfunctions.net/api',
//     headers: {
//         "Authorization": getToken()
//     },
// });