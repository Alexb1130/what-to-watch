import axios from 'axios';

const Error = {
    UNAUTHORIZED: 401
};

export const createAPI = () => {
    const api = axios.create({
        baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
        timeout: 5000,
        withCredentials: true
    });

    return api;
};
