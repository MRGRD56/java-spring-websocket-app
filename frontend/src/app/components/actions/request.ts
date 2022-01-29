import axios from 'axios';
import {BACKEND_HOST} from '../../constants/env';

export const axiosInstance = axios.create({
    baseURL: BACKEND_HOST
});

// const request = () => {
//     axiosInstance.request();
// };
//
// export default request;
